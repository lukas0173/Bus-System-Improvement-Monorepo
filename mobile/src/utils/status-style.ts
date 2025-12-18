import { Colors } from "../constants/theme";

const getStatusStyles = (status: string) => {
  if (status === "Hoàn thành" || status === "active") {
    return {
      badge: { backgroundColor: Colors.success[900] },
      text: { color: Colors.success[50] },
    };
  }
  if (status === "Đã hủy" || status === "stopped") {
    return {
      badge: { backgroundColor: Colors.error[900] },
      text: { color: Colors.error[50] },
    };
  }
  if (status === "maintenance") {
    return {
      badge: { backgroundColor: "#fff4ed" },
      text: { color: "#6c3813" },
    };
  }
  // Default/fallback style
  return {};
};

export default getStatusStyles;
