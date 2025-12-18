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
import { useStations } from "@/src/context/StationContext";
import getStatusStyles from "@/src/utils/status-style";
import HeaderDetailStation from "@/src/components/home/station/detail/Header.Detail.Station";
import MapDetailStation from "@/src/components/home/station/detail/Map.Detail.Station";

// Helper component for rendering detail rows
const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const StationDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { stations, isLoading } = useStations();

  const station = stations.find((s) => s.id === id);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.info[50]} />
      </View>
    );
  }

  if (!station) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Không tìm thấy dữ liệu trạm.</Text>
      </View>
    );
  }

  const statusStyle = getStatusStyles(station.status);

  return (
    <ScrollView style={styles.container}>
      <HeaderDetailStation station={station} />
      <MapDetailStation station={station} />

      {/* --- Info Details --- */}
      <View style={styles.infoContainer}>
        {/* Status Section */}
        <View style={styles.statusRow}>
          <Text style={styles.detailLabel}>Trạng thái</Text>
          <View style={[styles.statusBadge, statusStyle.badge]}>
            <Text style={[styles.statusBadgeText, statusStyle.text]}>
              {station.status}
            </Text>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.detailSection}>
          <DetailRow label="Tên trạm" value={station.name} />
          <DetailRow label="Địa chỉ" value={station.address} />
          <DetailRow label="Kinh độ" value={station.longitude.toFixed(6)} />
          <DetailRow label="Vĩ độ" value={station.latitude.toFixed(6)} />
        </View>
      </View>

      <TouchableOpacity 
        style={styles.selectButton}
        onPress={() => {}}
      >
        <Text style={styles.selectButtonText}>Chọn trạm</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default StationDetailScreen;

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
  },
  detailLabel: {
    fontSize: FontSize.sm,
    color: Colors.secondary[500],
  },
  detailValue: {
    fontSize: FontSize.sm,
    color: Colors.secondary[700],
    flex: 1,
    textAlign: 'right',
    marginLeft: Spacing.sm,
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
