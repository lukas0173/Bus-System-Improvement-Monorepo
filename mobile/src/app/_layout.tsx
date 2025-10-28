import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetch_system_logs } from "@api/system_logs";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [systemLogs, setSystemLogs] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLogs = async () => {
      try {
        setIsLoading(true);
        const returnedSystemLogs = await fetch_system_logs("test");
        setSystemLogs(returnedSystemLogs);
      } catch (error: any) {
        setError(error);
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
