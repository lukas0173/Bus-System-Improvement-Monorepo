import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
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

// Mapbox configuration
Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_TOKEN!);

// --- Mock Data ---
const MOCK_DATA = {
  title: "Tuyến 06",
  status: "Hoàn thành",
  requestTime: "14:22 - 10/11/2025",
  arrivalTime: "14:25 - 10/11/2025",
  duration: "20 phút",
  busNumber: "01",
  licensePlate: "012345",
  driverName: "Nguyễn Gì Đó",
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
  return (
    <View style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView style={styles.container}>
        {/* --- Header --- */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
            <ArrowLeft size={24} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{MOCK_DATA.title}</Text>
          {/* Spacer view to center the title perfectly */}
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
                  lineColor: "#EF4444", // Raw hex for red
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
              <Text style={styles.statusBadgeText}>{MOCK_DATA.status}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Time Section */}
          <View style={styles.detailSection}>
            <DetailRow
              label="Thời gian yêu cầu đón"
              value={MOCK_DATA.requestTime}
            />
            <DetailRow label="Thời gian xe đến" value={MOCK_DATA.arrivalTime} />
            <DetailRow
              label="Tổng thời gian di chuyển"
              value={MOCK_DATA.duration}
            />
          </View>

          <View style={styles.divider} />

          {/* Bus Section */}
          <View style={styles.detailSection}>
            <DetailRow label="Xe buýt số" value={MOCK_DATA.busNumber} />
            <DetailRow label="Biển số xe" value={MOCK_DATA.licensePlate} />
            <DetailRow label="Tên tài xế" value={MOCK_DATA.driverName} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HistoryDetailScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF", // White background for the whole screen
  },
  container: {
    flex: 1,
  },
  // --- Header Styles ---
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    padding: 10, // Hit area
    marginLeft: -10, // Align icon visually
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827", // Dark gray
  },
  // --- Map Styles ---
  mapContainer: {
    height: 350,
    marginVertical: 16,
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: "hidden", // Clips the map to the border radius
    backgroundColor: "#E5E7EB", // Light gray placeholder
  },
  map: {
    flex: 1,
  },
  mapMarker: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#EF4444", // Red
    borderWidth: 2,
    borderColor: "#FFFFFF", // White
  },
  // --- Info Styles ---
  infoContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    backgroundColor: "#F8F9FA", // Very light gray background for info
    borderRadius: 16,
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusBadge: {
    backgroundColor: "#D1FAE5", // Light green
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusBadgeText: {
    color: "#065F46", // Dark green
    fontSize: 12,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB", // Light gray
    marginVertical: 16,
  },
  detailSection: {
    gap: 12, // Spaces out the rows
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailLabel: {
    fontSize: 14,
    color: "#6B7280", // Medium gray
  },
  detailValue: {
    fontSize: 14,
    color: "#1F2937", // Darker gray
    fontWeight: "500",
  },
});
