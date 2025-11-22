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
import Mapbox, {
  Camera,
  MapView,
  ShapeSource,
  LineLayer,
  PointAnnotation,
} from "@rnmapbox/maps";
import { Position, Point, Feature, LineString } from "geojson";
import { useRouter, useLocalSearchParams } from "expo-router";
import { BorderRadius, Colors, FontSize, Spacing } from "@/src/constants/theme";
import { useTrip } from "@/src/context/TripHistoryContext";

// Mapbox configuration
Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_TOKEN!);

// Helper function to calculate duration
const calculateDuration = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diff = endDate.getTime() - startDate.getTime();
  const minutes = Math.floor(diff / 60000);
  return `${minutes} phút`;
};

// Mock GeoJSON data for the route, start, and end points
const MOCK_ROUTE_COORDINATES: Position[] = [
  [108.2104, 16.0617],
  [108.2115, 16.0612],
  [108.212, 16.0605],
  [108.2128, 16.059],
  [108.2135, 16.058],
  [108.215, 16.0555],
  [108.2158, 16.054],
];

const MOCK_START_POINT: Point = {
  type: "Point",
  coordinates: MOCK_ROUTE_COORDINATES[0],
};

const MOCK_END_POINT: Point = {
  type: "Point",
  coordinates: MOCK_ROUTE_COORDINATES[MOCK_ROUTE_COORDINATES.length - 1],
};

const MOCK_ROUTE_GEOJSON: Feature<LineString> = {
  type: "Feature",
  geometry: {
    type: "LineString",
    coordinates: MOCK_ROUTE_COORDINATES,
  },
  properties: {},
} as const;

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

      {/* --- Map --- */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          logoEnabled={false}
          scaleBarEnabled={false}
          attributionEnabled={false}
        >
          <Camera
            bounds={{
              ne: MOCK_ROUTE_COORDINATES[0],
              sw: MOCK_ROUTE_COORDINATES[MOCK_ROUTE_COORDINATES.length - 1],
            }}
            padding={{
              paddingLeft: 40,
              paddingRight: 40,
              paddingTop: 40,
              paddingBottom: 40,
            }}
            animationMode="flyTo"
            animationDuration={0}
          />

          {/* Route Line */}
          <ShapeSource id="route-source" shape={MOCK_ROUTE_GEOJSON}>
            <LineLayer
              id="route-line"
              style={{
                lineCap: "round",
                lineJoin: "round",
                lineColor: "red",
                lineWidth: 4,
              }}
            />
          </ShapeSource>

          {/* Start Point Marker */}
          <PointAnnotation
            id="start-point"
            coordinate={MOCK_START_POINT.coordinates}
          >
            <View style={styles.mapMarker} />
          </PointAnnotation>

          {/* End Point Marker */}
          <PointAnnotation
            id="end-point"
            coordinate={MOCK_END_POINT.coordinates}
          >
            <View style={styles.mapMarker} />
          </PointAnnotation>
        </MapView>
      </View>

      {/* --- Info Details --- */}
      <View style={styles.infoContainer}>
        {/* Status Section */}
        <View style={styles.statusRow}>
          <Text style={styles.detailLabel}>Trạng thái</Text>
          <View style={styles.statusBadge}>
            <Text style={styles.statusBadgeText}>{trip.status}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Time Section */}
        <View style={styles.detailSection}>
          <DetailRow label="Thời gian yêu cầu đón" value={trip.start} />
          <DetailRow label="Thời gian xe đến" value={trip.end} />
          <DetailRow
            label="Tổng thời gian di chuyển"
            value={calculateDuration(trip.start, trip.end)}
          />
        </View>

        <View style={styles.divider} />

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
  mapContainer: {
    width: "100%",
    aspectRatio: 1,
    marginVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    overflow: "hidden",
    backgroundColor: Colors.secondary[950],
  },
  map: {
    flex: 1,
  },
  mapMarker: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: "black",
    borderWidth: 2,
    borderColor: "white",
  },
  infoContainer: {
    marginBottom: 20,
    padding: Spacing.md,
    backgroundColor: Colors.primary[800],
    borderRadius: BorderRadius.md,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 16,
  },
  detailSection: {
    gap: 12,
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
