import React, { useEffect, useMemo, useState } from "react";
import Mapbox, { Camera, CircleLayer, ShapeSource } from "@rnmapbox/maps";
import { StyleSheet } from "react-native";

import { BorderRadius } from "@/src/constants/theme";
import { fetchStations } from "@/src/api/pocketbase.read";
import { Station } from "@/src/types/pocketbase-types";

// Mapbox configuration
Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_PUBLIC_TOKEN!);

const MapHome = () => {
  const [stations, setStations] = useState<Station[]>([]);

  useEffect(() => {
    const loadStations = async () => {
      try {
        const data = await fetchStations();
        setStations(data);
      } catch (error) {
        console.error("Failed to load stations", error);
      }
    };
    loadStations();
  }, []);

  const busStationsGeoJSON = useMemo(() => {
    return {
      type: "FeatureCollection",
      features: stations.map((station) => ({
        type: "Feature",
        id: station.id,
        geometry: {
          type: "Point",
          coordinates: [station.longitude, station.latitude],
        },
        properties: {
          id: station.id,
          name: station.name,
          address: station.address,
          status: station.status,
        },
      })),
    } as const;
  }, [stations]);

  return (
    <Mapbox.MapView
      style={styles.map}
      logoEnabled={false}
      scaleBarEnabled={false}
      attributionEnabled={false}
    >
      <Camera zoomLevel={13} centerCoordinate={[108.2022, 16.0544]} />

      {stations.length > 0 && (
        <ShapeSource id="busStationsSource" shape={busStationsGeoJSON}>
          <CircleLayer
            id="busStationsLayer"
            style={{
              circleRadius: 6,
              circleColor: "#007AFF",
              circleStrokeWidth: 2,
              circleStrokeColor: "#FFFFFF",
            }}
          />
        </ShapeSource>
      )}
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
