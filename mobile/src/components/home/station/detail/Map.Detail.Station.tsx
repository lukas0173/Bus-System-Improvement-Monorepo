import React, { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import Mapbox, { Camera, MapView, PointAnnotation } from "@rnmapbox/maps";
import { Point } from "geojson";
import { Colors, Spacing, BorderRadius } from "@/src/constants/theme";
import { UIStation } from "@/src/types/UI/station";

// Mapbox configuration
Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_TOKEN!);

const MapDetailStation = ({ station }: { station: UIStation }) => {
  const coordinates = useMemo(() => {
    if (!station.latitude || !station.longitude) return null;
    return [station.longitude, station.latitude]; // Mapbox uses [lon, lat]
  }, [station.latitude, station.longitude]);

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
          zoomLevel={15}
          animationMode="flyTo"
          animationDuration={0}
        />

        {/* Station Location Marker */}
        <PointAnnotation id="station-point" coordinate={coordinates}>
            <View style={styles.mapMarker} />
        </PointAnnotation>
      </MapView>
    </View>
  );
};
export default MapDetailStation;

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
