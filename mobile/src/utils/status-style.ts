import { Colors } from "../constants/theme";

const getStatusStyles = (status: string) => {
  if (status === "Hoàn thành" || status === "Hoạt động") {
    return {
      badge: { backgroundColor: Colors.success[900] },
      text: { color: Colors.success[50] },
    };
  }
  if (status === "Đã hủy" || status === "Tạm dừng") {
    return {
      badge: { backgroundColor: Colors.error[900] },
      text: { color: Colors.error[50] },
    };
  }
  // Default/fallback style
  return {};
};

export default getStatusStyles;
