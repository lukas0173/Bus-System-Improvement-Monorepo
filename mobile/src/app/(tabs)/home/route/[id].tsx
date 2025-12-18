import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { BorderRadius, Colors, FontSize, Spacing } from "@/src/constants/theme";
import { useLocalSearchParams } from "expo-router";
import { useRoutes } from "@/src/context/RouteContext";
import getStatusStyles from "@/src/utils/status-style";
import HeaderDetailRoute from "@/src/components/home/route/detail/Header.Detail.Route";
import MapDetailRoute from "@/src/components/home/route/detail/Map.Detail.Route";

// Helper component for rendering detail rows
const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const RouteDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { routes, isLoading } = useRoutes();

  const route = routes.find((r) => r.id === id);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.info[50]} />
      </View>
    );
  }

  if (!route) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Không tìm thấy dữ liệu tuyến đường.</Text>
      </View>
    );
  }

  const statusStyle = getStatusStyles(route.status);

  return (
    <ScrollView style={styles.container}>
      <HeaderDetailRoute route={route} />
      <MapDetailRoute route={route} />

      {/* --- Info Details --- */}
      <View style={styles.infoContainer}>
        {/* Status Section */}
        <View style={styles.statusRow}>
          <Text style={styles.detailLabel}>Trạng thái</Text>
          <View style={[styles.statusBadge, statusStyle.badge]}>
            <Text style={[styles.statusBadgeText, statusStyle.text]}>
              {route.status}
            </Text>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.detailSection}>
            <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Tên tuyến</Text>
                <Text style={[styles.detailValue, { flex: 1, textAlign: 'right', marginLeft: Spacing.sm }]}>
                    {route.name}
                </Text>
            </View>
            <DetailRow label="Mã số" value={route.code} />
            <View style={[styles.detailRow, { alignItems: 'flex-start' }]}>
                <Text style={styles.detailLabel}>Mô tả</Text>
                <Text style={[styles.detailValue, { flex: 1, textAlign: 'right', marginLeft: Spacing.sm }]}>
                    {route.description}
                </Text>
            </View>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.selectButton}
        onPress={() => {}}
      >
        <Text style={styles.selectButtonText}>Chọn tuyến</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RouteDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.primary[950],
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary[950],
  },
  errorText: {
    color: "white",
    fontSize: FontSize.lg,
    marginBottom: Spacing.md,
  },
  infoContainer: {
    marginBottom: 20,
    backgroundColor: Colors.primary[800],
    borderRadius: BorderRadius.md,
    gap: 10,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0px 1.5px 2px 0px rgba(0, 0, 0, 0.25)",
    borderRadius: BorderRadius.sm,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  statusBadge: {
    backgroundColor: Colors.success[900],
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.xs,
  },
  statusBadgeText: {
    color: Colors.success[50],
    fontSize: FontSize.xs,
    fontWeight: "medium",
  },
  detailSection: {
    boxShadow: "0px 1.5px 2px 0px rgba(0, 0, 0, 0.25)",
    borderRadius: BorderRadius.sm,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 2,
  },
  detailLabel: {
    fontSize: FontSize.sm,
    color: Colors.secondary[500],
  },
  detailValue: {
    fontSize: FontSize.sm,
    color: Colors.secondary[700],
  },
  selectButton: {
    backgroundColor: Colors.info[400],
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    marginTop: Spacing.md,
    marginBottom: Spacing.xl,
  },
  selectButtonText: {
    color: "white",
    fontSize: FontSize.md,
    fontWeight: "bold",
  },
});
