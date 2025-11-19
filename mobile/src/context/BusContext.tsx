import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { fetchBuses, fetchFirstBusLocationById } from "@api/pocketbase.read";
import { Bus as PBBus } from "@/src/types/pocketbase-types";
import { Bus as UIBus } from "@/src/types/bus";

// Define the shape of the context state
interface BusContextType {
  buses: UIBus[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

// Context intialization
const BusContext = createContext<BusContextType | undefined>(undefined);

// Context provider
export const BusProvider = ({ children }: { children: ReactNode }) => {
  const [buses, setBuses] = useState<UIBus[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Define the data fetching and processing function
  const fetchAndProcessBuses = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch all buses from the 'buses' collection
      const rawBuses = await fetchBuses();

      // For each bus, fetch its single most recent location in parallel
      const processedBusesPromises = rawBuses.map(async (bus: PBBus) => {
        try {
          const latestLocation = await fetchFirstBusLocationById(bus.id, {
            sort: "-created_at",
          });
          // If a location is found, map the data
          return {
            id: bus.id,
            name: bus.name,
            licensePlate: bus.license_plate,
            status: "Hoạt động",
            lastUpdate: latestLocation.created_at,
            capacity: `Sức chứa: ${bus.capacity}`,
            position: `${latestLocation.longitude}, ${latestLocation.latitude}`,
          };
        } catch (error) {
          // If getFirstListItem throws an error (e.g., no records found), log it and return null
          console.error(
            `[Context - Bus] No location found for bus ${bus.id}:`,
            error,
          );
          return null;
        }
      });

      // Wait for all parallel fetches to complete
      const processedBuses = (await Promise.all(processedBusesPromises)).filter(
        (bus): bus is UIBus => bus !== null,
      ); // Filter out any buses that had no location

      setBuses(processedBuses);
    } catch (err) {
      console.error("[Context - Bus] Error fetching data:", err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    fetchAndProcessBuses();
  }, [fetchAndProcessBuses]);

  const value = {
    buses,
    isLoading,
    error,
    refetch: fetchAndProcessBuses,
  };

  return <BusContext.Provider value={value}>{children}</BusContext.Provider>;
};

// Create a custom hook for easy consumption
export const useBuses = () => {
  const context = useContext(BusContext);
  if (context === undefined) {
    throw new Error(
      "[Context - Bus] useBuses must be used within a BusProvider",
    );
  }
  return context;
};
