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
import { UITripHistory } from "@/src/types/trip-history";

// Define the shape of the context state
interface TripHistoryContextType {
  tripHistories: UITripHistory[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

// Context initialization
const TripHistoryContext = createContext<TripHistoryContextType | undefined>(
  undefined,
);

// Context provider
export const TripHistoryProvider = ({ children }: { children: ReactNode }) => {
  const [tripHistories, setTripHistories] = useState<UITripHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Define the data fetching and processing function
  const fetchAndProcessTripHistories = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch all trip histories, expanding bus and route relations
      // Note: This assumes fetchTripHistories can accept options.
      // You may need to modify the function in pocketbase.read.ts
      const rawTripHistories = await fetchTripHistories({
        expand: "bus,route",
      });

      // Process the raw data into a UI-friendly format
      const processedTripHistories = rawTripHistories.map(
        (history: PBTripHistory) => {
          const busName = history.expand?.bus?.name || "Unknown Bus";
          const routeName = history.expand?.route?.name || "Unknown Route";

          return {
            id: history.id,
            start: new Date(history.start).toLocaleString(),
            end: new Date(history.end).toLocaleString(),
            bus: busName,
            locations: history.locations,
            status: history.status,
            route: routeName,
            created: new Date(history.created).toLocaleString(),
            updated: new Date(history.updated).toLocaleString(),
          } as UITripHistory;
        },
      );

      setTripHistories(processedTripHistories);
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
    tripHistories,
    isLoading,
    error,
    refetch: fetchAndProcessTripHistories,
  };

  return (
    <TripHistoryContext.Provider value={value}>
      {children}
    </TripHistoryContext.Provider>
  );
};

// Create a custom hook for easy consumption
export const useTripHistories = () => {
  const context = useContext(TripHistoryContext);
  if (context === undefined) {
    throw new Error(
      "[Context - TripHistory] useTripHistories must be used within a TripHistoryProvider",
    );
  }
  return context;
};
