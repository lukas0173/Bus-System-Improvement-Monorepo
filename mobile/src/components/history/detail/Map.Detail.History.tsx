import React from "react";
import { View, StyleSheet } from "react-native";
import Mapbox, {
  Camera,
  MapView,
  ShapeSource,
  LineLayer,
  PointAnnotation,
} from "@rnmapbox/maps";
import { Position, Point, Feature, LineString } from "geojson";
import { Colors, Spacing, BorderRadius } from "@/src/constants/theme";

// Mapbox configuration
Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_TOKEN!);

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
const MapDetailHistory = () => {
  return (
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
        <PointAnnotation id="end-point" coordinate={MOCK_END_POINT.coordinates}>
          <View style={styles.mapMarker} />
        </PointAnnotation>
      </MapView>
    </View>
  );
};
export default MapDetailHistory;

const styles = StyleSheet.create({
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
});
