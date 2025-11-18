import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { fetchBuses, fetchBusLocationsById } from "@api/pocketbase.read"; // Import your API function
import { Bus as PBBus } from "@/src/types/pocketbase-types"; // PocketBase 'Bus' type
import { Bus as UIBus } from "@/src/types/bus"; // Your UI 'Bus' type

// Define the shape of the context state
interface BusContextType {
  buses: UIBus[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

// Create the context
const BusContext = createContext<BusContextType | undefined>(undefined);

// Define the provider component
export const BusProvider = ({ children }: { children: ReactNode }) => {
  const [buses, setBuses] = useState<UIBus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Define the data fetching and processing function
  const fetchAndProcessBuses = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch ALL buses from the 'buses' collection
      const rawBuses = await fetchBuses();
      const rawLocations = await fetchBusLocationsById("jb5xemoa6u396x7");
      console.log(rawLocations[0]);

      // --- Transform the data ---
      // Map PocketBase 'Bus' data to fit your UI 'Bus' type
      const processedBuses: UIBus[] = rawBuses.map((bus: PBBus) => {
        return {
          id: bus.id,
          title: bus.license_plate, // Map 'license_plate' to 'title'
          status: "Hoạt động",

          // Map 'capacity' to the 'route' field
          capacity: `Sức chứa: ${bus.capacity}`,
          position: `${rawLocations[0].longitude}, ${rawLocations[0].latitude}`,

          date: rawLocations[0].created_at,
        };
      });

      setBuses(processedBuses);
    } catch (err) {
      console.error("[BusContext] Error fetching data:", err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    fetchAndProcessBuses();
  }, [fetchAndProcessBuses]);

  // Provide the state and refetch function to children
  const value = {
    buses,
    isLoading,
    error,
    refetch: fetchAndProcessBuses, // Expose the refetch function
  };

  return <BusContext.Provider value={value}>{children}</BusContext.Provider>;
};

// Create a custom hook for easy consumption
export const useBuses = () => {
  const context = useContext(BusContext);
  if (context === undefined) {
    throw new Error("useBuses must be used within a BusProvider");
  }
  return context;
};
