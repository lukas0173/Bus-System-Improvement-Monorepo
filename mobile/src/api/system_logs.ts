import axios from "axios";

const apiURL = `${process.env.EXPO_PUBLIC_API_URL}/collections/system_logs/records`;
const abortController = new AbortController();

export const fetch_system_logs = async (device_id: string) => {
  try {
    const systemLogsURL = `${apiURL}?filter=(device_id="${device_id}")`;
    const response = await axios.get(systemLogsURL, {
      signal: abortController.signal,
    });

    if (response.status === 200) {
      console.log("[API] Successfully fetch system logs");
      return response.data;
    }
  } catch (error) {
    if (abortController.signal.aborted) {
      console.log("[API] System logs fetching cancelled");
    } else {
      console.log("[API] System logs fetching error");
    }
    throw error;
  }
};
