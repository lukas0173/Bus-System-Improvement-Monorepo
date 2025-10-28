import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { fetchSystemLogs } from "@api/pocketbase.read";
import { SystemLog } from "../types/pocketbase-types";

export default function RootLayout() {
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLogs = async () => {
      try {
        setIsLoading(true);
        const returnedSystemLogs = await fetchSystemLogs();
        setSystemLogs(returnedSystemLogs);
      } catch (error: any) {
        console.log(`[ERROR] ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadLogs();
  }, []);

  console.log("[DEBUG] This is the system logs");
  console.log(`[DEBUG] Is loading state: ${isLoading}`);
  console.log(systemLogs);

  return (
    <SafeAreaView>
      <View>
        <Text>This is a test screen</Text>
      </View>
    </SafeAreaView>
  );
}
