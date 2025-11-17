import React from "react";
import Mapbox, { Camera } from "@rnmapbox/maps";
import { StyleSheet } from "react-native";

import { BorderRadius } from "@/src/constants/theme";

// Mapbox configuration
Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_TOKEN!);
const MapHome = () => {
  return (
    <Mapbox.MapView
      style={styles.map}
      logoEnabled={false}
      scaleBarEnabled={false}
      attributionEnabled={false}
    >
      <Camera zoomLevel={14} centerCoordinate={[108.149929, 16.074512]} />
    </Mapbox.MapView>
  );
};

export default MapHome;

const styles = StyleSheet.create({
  map: {
    flex: 1,
    borderRadius: BorderRadius.md,
    overflow: "hidden",
  },
});
