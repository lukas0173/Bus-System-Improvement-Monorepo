import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import Mapbox, { Camera, MapView, PointAnnotation } from "@rnmapbox/maps";
import { Point } from "geojson";
import { Colors, Spacing, BorderRadius } from "@/src/constants/theme";
import { UIBus } from "@/src/types/UI/bus";

// Mapbox configuration
Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_TOKEN!);

const MapDetailBus = ({ bus }: { bus: UIBus }) => {
  const coordinates = useMemo(() => {
    if (!bus.position || bus.position === "Unknown") return null;
    const [lon, lat] = bus.position.split(",").map((s) => parseFloat(s.trim()));
    if (isNaN(lon) || isNaN(lat)) return null;
    return [lon, lat];
  }, [bus.position]);

  if (!coordinates) {
    return (
      <View
        style={[
          styles.mapContainer,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <View style={styles.mapMarker} />
      </View>
    );
  }

  const point: Point = {
    type: "Point",
    coordinates: coordinates,
  };

  return (
    <View style={styles.mapContainer}>
      <MapView
        style={styles.map}
        logoEnabled={false}
        scaleBarEnabled={false}
        attributionEnabled={false}
      >
        <Camera
          centerCoordinate={coordinates}
          zoomLevel={14}
          animationMode="flyTo"
          animationDuration={0}
        />

        {/* Bus Location Marker */}
        <PointAnnotation id="bus-point" coordinate={coordinates}>
          <View style={styles.mapMarker} />
        </PointAnnotation>
      </MapView>
    </View>
  );
};
export default MapDetailBus;

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
    borderRadius: 10,
    backgroundColor: Colors.info[400],
    borderWidth: 2,
    borderColor: "white",
  },
});
