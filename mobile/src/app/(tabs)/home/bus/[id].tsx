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
import { useRouter, useLocalSearchParams } from "expo-router";
import { useBuses } from "@/src/context/BusContext";
import { useSelection } from "@/src/context/SelectionContext";
import getStatusStyles from "@/src/utils/status-style";
import HeaderDetailBus from "@/src/components/home/bus/detail/Header.Detail.Bus";
import MapDetailBus from "@/src/components/home/bus/detail/Map.Detail.Bus";

// Helper component for rendering detail rows
const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const BusDetailScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { buses, isLoading } = useBuses();
  const { addItem } = useSelection();

  const bus = buses.find((b) => b.id === id);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.info[50]} />
      </View>
    );
  }

  if (!bus) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Không tìm thấy dữ liệu xe buýt.</Text>
      </View>
    );
  }

  const handleSelect = () => {
    addItem("bus", bus);
    router.dismissAll();
    router.navigate("/home");
  };

  const statusStyle = getStatusStyles(bus.status);

  return (
    <ScrollView style={styles.container}>
      <HeaderDetailBus bus={bus} />
      <MapDetailBus bus={bus} />

      {/* --- Info Details --- */}
      <View style={styles.infoContainer}>
        {/* Status Section */}
        <View style={styles.statusRow}>
          <Text style={styles.detailLabel}>Trạng thái</Text>
          <View style={[styles.statusBadge, statusStyle.badge]}>
            <Text style={[styles.statusBadgeText, statusStyle.text]}>
              {bus.status}
            </Text>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.detailSection}>
          <DetailRow label="Biển số xe" value={bus.licensePlate} />
          <DetailRow label="Sức chứa" value={bus.capacity.toString()} />
          <DetailRow
            label="Cập nhật lần cuối"
            value={new Date(bus.lastUpdate).toLocaleString()}
          />
          <DetailRow label="Vị trí" value={bus.position} />
        </View>
      </View>

      <TouchableOpacity 
        style={styles.selectButton}
        onPress={handleSelect}
      >
        <Text style={styles.selectButtonText}>Chọn xe</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default BusDetailScreen;

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
