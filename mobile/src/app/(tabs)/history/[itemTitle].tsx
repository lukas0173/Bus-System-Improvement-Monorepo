import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { BorderRadius, Colors, FontSize, Spacing } from "@/src/constants/theme";
import { useTrip } from "@/src/context/TripHistoryContext";
import getStatusStyles from "@/src/utils/status-style";
import calculateDuration from "@/src/utils/duration-calculation";
import MapDetailHistory from "@/src/components/history/detail/Map.Detail.History";

// Helper component for rendering detail rows
const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const HistoryDetailScreen = () => {
  const router = useRouter();
  const { itemTitle } = useLocalSearchParams<{ itemTitle: string }>();
  const { tripHistoryDetails, isLoading } = useTrip();

  const trip = tripHistoryDetails.find((t) => t.route.name === itemTitle);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.info[50]} />
      </View>
    );
  }

  if (!trip) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Không tìm thấy dữ liệu chuyến đi.</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const statusStyle = getStatusStyles(trip.status);

  return (
    <ScrollView style={styles.container}>
      {/* --- Header --- */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={Colors.info[50]} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{trip.route.name}</Text>
        <View style={{ width: 40 }} />
      </View>

      <MapDetailHistory />

      {/* --- Info Details --- */}
      <View style={styles.infoContainer}>
        {/* Status Section */}
        <View style={styles.statusRow}>
          <Text style={styles.detailLabel}>Trạng thái</Text>
          <View style={[styles.statusBadge, statusStyle.badge]}>
            <Text style={[styles.statusBadgeText, statusStyle.text]}>
              {trip.status}
            </Text>
          </View>
        </View>

        {/* Time Section */}
        <View style={styles.detailSection}>
          <DetailRow label="Thời gian yêu cầu đón" value={trip.created} />
          <DetailRow label="Thời gian xe đến" value={trip.start} />
          <DetailRow
            label="Tổng thời gian di chuyển"
            value={calculateDuration(trip.start, trip.end)}
          />
        </View>

        {/* Bus Section */}
        <View style={styles.detailSection}>
          <DetailRow label="Xe buýt" value={trip.bus.name} />
          <DetailRow label="Biển số xe" value={trip.bus.license_plate} />
        </View>
      </View>
    </ScrollView>
  );
};

export default HistoryDetailScreen;

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
  backLink: {
    color: Colors.info[50],
    fontSize: FontSize.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xs,
  },
  backButton: {
    padding: Spacing.sm,
    marginLeft: -Spacing.sm,
  },
  headerTitle: {
    fontSize: FontSize.lg,
    fontWeight: "bold",
    color: Colors.info[50],
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
});
