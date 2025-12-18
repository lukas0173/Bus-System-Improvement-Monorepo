import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Bus, Shuffle, MapPin, Check } from "lucide-react-native";
import { Colors, Spacing, BorderRadius, FontSize } from "@constants/theme";
import { SelectedItem, useSelection } from "@/src/context/SelectionContext";
import { createTripHistory } from "@/src/api/pocketbase.create";

const SelectionCard = ({ item }: { item: SelectedItem }) => {
  const { removeItem } = useSelection();

  const handleCompleteTrip = async () => {
    try {
      // Hardcoded values as requested
      const FIXED_BUS_ID = "jtllrwa207xa1p7";
      const FIXED_ROUTE_ID = "jwf62a5j8g2ty3j";

      const startTime = new Date();
      const endTime = new Date(startTime.getTime() + 30 * 60000); // +30 mins

      const payload = {
        start: startTime.toISOString(),
        end: endTime.toISOString(),
        bus: FIXED_BUS_ID,
        route: FIXED_ROUTE_ID,
        status: "Hoàn thành",
        locations: undefined, // Using the selected item ID as location
      };

      await createTripHistory(payload);
      Alert.alert("Thành công", "Chuyến đi đã được ghi lại!");
      removeItem(item.id);
    } catch (error) {
      console.error("Failed to save trip history", error);
      Alert.alert("Lỗi", "Không thể lưu chuyến đi. Vui lòng thử lại.");
    }
  };

  const getIcon = () => {
    switch (item.type) {
      case "bus":
        return <Bus size={24} color={Colors.info[50]} />;
      case "route":
        return <Shuffle size={24} color={Colors.info[50]} />;
      case "station":
        return <MapPin size={24} color={Colors.info[50]} />;
      default:
        return null;
    }
  };

  const getLabel = () => {
    switch (item.type) {
      case "bus":
        return "Xe đang đến";
      case "route":
        return "Tuyến đã chọn";
      case "station":
        return "Trạm đón";
      default:
        return "Đã chọn";
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>{getIcon()}</View>
      <View style={styles.contentContainer}>
        <Text style={styles.label}>{getLabel()}</Text>
        <Text style={styles.title} numberOfLines={1}>
          {item.data.name}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {item.type === "bus"
            ? (item.data as any).licensePlate
            : item.type === "route"
              ? (item.data as any).code
              : (item.data as any).address}
        </Text>
      </View>
      <TouchableOpacity style={styles.closeButton} onPress={handleCompleteTrip}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 30,
            aspectRatio: 1,
            backgroundColor: Colors.success[900],
            borderRadius: BorderRadius.xs,
            borderWidth: 1,
            borderColor: Colors.success[50],
          }}
        >
          <Check size={20} color={Colors.success[50]} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SelectionCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.info[950],
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.info[950],
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.sm,
  },
  contentContainer: {
    flex: 1,
  },
  label: {
    fontSize: FontSize.xs,
    color: Colors.info[50],
    opacity: 0.7,
    fontWeight: "bold",
    marginBottom: 2,
  },
  title: {
    fontSize: FontSize.sm,
    fontWeight: "bold",
    color: Colors.info[50],
  },
  subtitle: {
    fontSize: FontSize.xs,
    color: Colors.secondary[500],
  },
  closeButton: {
    padding: Spacing.xs,
  },
});
