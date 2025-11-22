import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { fetchTripHistories } from "@api/pocketbase.read";
import { TripHistory as PBTripHistory } from "@/src/types/pocketbase-types";
import { UITripHistory, UITripHistoryDetail } from "@/src/types/trip-history";

// Define the shape of the context state
interface TripContextType {
  tripHistoryList: UITripHistory[];
  tripHistoryDetails: UITripHistoryDetail[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

// Context initialization
const TripContext = createContext<TripContextType | undefined>(undefined);

// Context provider
export const TripHistoryProvider = ({ children }: { children: ReactNode }) => {
  const [tripHistoryList, setTripHistoryList] = useState<UITripHistory[]>([]);
  const [tripHistoryDetails, setTripHistoryDetails] = useState<
    UITripHistoryDetail[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Define the data fetching and processing function
  const fetchAndProcessTripHistories = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch all trip histories, expanding bus and route relations
      const rawTripHistories = await fetchTripHistories({
        expand: "bus,route",
      });

      // Process for Trip History List
      const processedTripHistoryList = rawTripHistories.map(
        (history: PBTripHistory) => {
          return {
            id: history.id,
            created: new Date(history.created).toLocaleString(),
            status: history.status,
            routeName: history.expand?.route?.name || "Unknown Route",
            busName: history.expand?.bus?.name || "Unknown Bus",
          } as UITripHistory;
        },
      );

      // Process for Trip History Details
      const processedTripHistoryDetails = rawTripHistories.map(
        (history: PBTripHistory) => {
          return {
            id: history.id,
            start: new Date(history.start).toLocaleString(),
            end: new Date(history.end).toLocaleString(),
            bus: history.expand?.bus,
            locations: history.locations,
            status: history.status,
            route: history.expand?.route,
            created: new Date(history.created).toLocaleString(),
            updated: new Date(history.updated).toLocaleString(),
          } as UITripHistoryDetail;
        },
      );

      setTripHistoryList(processedTripHistoryList);
      setTripHistoryDetails(processedTripHistoryDetails);
    } catch (err) {
      console.error("[Context - TripHistory] Error fetching data:", err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    fetchAndProcessTripHistories();
  }, [fetchAndProcessTripHistories]);

  const value = {
    tripHistoryList,
    tripHistoryDetails,
    isLoading,
    error,
    refetch: fetchAndProcessTripHistories,
  };

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
};

// Create a custom hook for easy consumption
export const useTrip = () => {
  const context = useContext(TripContext);
  if (context === undefined) {
    throw new Error(
      "[Context - TripHistory] useTrip must be used within a TripHistoryProvider",
    );
  }
  return context;
};
