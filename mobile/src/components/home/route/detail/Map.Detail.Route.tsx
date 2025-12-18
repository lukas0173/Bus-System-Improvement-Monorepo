import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import Mapbox, {
  Camera,
  MapView,
  ShapeSource,
  LineLayer,
} from "@rnmapbox/maps";
import { Feature, LineString, MultiLineString } from "geojson";
import { Colors, Spacing, BorderRadius } from "@/src/constants/theme";
import { UIRoute } from "@/src/types/UI/route";

// Mapbox configuration
Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_TOKEN!);

const MapDetailRoute = ({ route }: { route: UIRoute }) => {
  const { shape, centerCoordinate } = useMemo(() => {
    if (!route.pathJson || !Array.isArray(route.pathJson)) {
      return { shape: null, centerCoordinate: null };
    }

    // The data seems to be [[[lat, lon], [lat, lon], ...]] based on the screenshot.
    // Mapbox expects [lon, lat].
    // Let's inspect the structure.
    // If it's a MultiLineString: [ [[lon, lat], ...], [[lon, lat], ...] ]
    // We need to swap coordinates if they are [lat, lon].
    
    // Helper to normalize coordinates to [lon, lat]
    // Heuristic: If the second value (candidate lat) is > 90 or < -90, it must be Longitude.
    // So the input is [lat, lon]. We need to swap.
    // Otherwise, assume it's already [lon, lat] or ambiguous (treated as [lon, lat]).
    const normalize = (coord: number[]) => {
      const [v1, v2] = coord;
      // If v2 is out of latitude bounds, it's likely longitude. So input is [lat, lon].
      if (Math.abs(v2) > 90) {
          return [v2, v1];
      }
      // If v1 is out of latitude bounds (and v2 isn't), it's likely longitude. So input is [lon, lat].
      // We return as is.
      return [v1, v2];
    };

    let features: number[][][] = [];
    let allPoints: number[][] = [];

    // Assuming the structure is an array of segments (arrays of points)
    if (Array.isArray(route.pathJson[0]) && Array.isArray(route.pathJson[0][0])) {
         features = route.pathJson.map((segment: number[][]) => 
            segment.map((point: number[]) => {
                const normalized = normalize(point);
                allPoints.push(normalized);
                return normalized;
            })
         );
    } else if (Array.isArray(route.pathJson[0])) {
         const segment = route.pathJson.map((point: any) => {
             if(Array.isArray(point) && point.length >= 2) {
                 const normalized = normalize(point);
                 allPoints.push(normalized);
                 return normalized;
             }
             return [0,0];
         });
         features.push(segment);
    }

    if (features.length === 0) return { shape: null, centerCoordinate: null };

    const geometry: MultiLineString = {
        type: "MultiLineString",
        coordinates: features,
    };

    const shape: Feature<MultiLineString> = {
        type: "Feature",
        properties: {},
        geometry: geometry,
    };

    // Calculate center roughly
    let center = [108.2022, 16.0544]; // Default Da Nang
    if (allPoints.length > 0) {
        const sum = allPoints.reduce((acc, p) => [acc[0] + p[0], acc[1] + p[1]], [0, 0]);
        center = [sum[0] / allPoints.length, sum[1] / allPoints.length];
    }

    return { shape, centerCoordinate: center };
  }, [route.pathJson]);

  if (!shape || !centerCoordinate) {
    return (
      <View
        style={[
          styles.mapContainer,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        {/* Placeholder or Empty State */}
      </View>
    );
  }

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        logoEnabled={false}
        scaleBarEnabled={false}
        attributionEnabled={false}
      >
        <Camera
          centerCoordinate={centerCoordinate}
          zoomLevel={11}
          animationMode="flyTo"
          animationDuration={0}
        />

        <ShapeSource id="routeSource" shape={shape}>
          <LineLayer
            id="routeLine"
            style={{
              lineColor: Colors.info[400],
              lineWidth: 4,
              lineCap: "round",
              lineJoin: "round",
            }}
          />
        </ShapeSource>
      </MapView>
    </View>
  );
};
export default MapDetailRoute;

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
});
