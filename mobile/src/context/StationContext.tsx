import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { fetchStations } from "@api/pocketbase.read";
import { Station as PBStation } from "@/src/types/pocketbase-types";
import { UIStation } from "../types/UI/station";

// Define the shape of the context state
interface StationContextType {
  stations: UIStation[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

// Context initialization
const StationContext = createContext<StationContextType | undefined>(undefined);

// Context provider
export const StationProvider = ({ children }: { children: ReactNode }) => {
  const [stations, setStations] = useState<UIStation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Define the data fetching and processing function
  const fetchAndProcessStations = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch all stations
      const rawStations = await fetchStations();

      // Map to UI type
      const processedStations = rawStations.map((station: PBStation) => ({
        id: station.id,
        name: station.name,
        address: station.address,
        latitude: station.latitude,
        longitude: station.longitude,
        status: station.status,
      }));

      setStations(processedStations);
    } catch (err) {
      console.error("[Context - Station] Error fetching data:", err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    fetchAndProcessStations();
  }, [fetchAndProcessStations]);

  const value = {
    stations,
    isLoading,
    error,
    refetch: fetchAndProcessStations,
  };

  return (
    <StationContext.Provider value={value}>{children}</StationContext.Provider>
  );
};

// Create a custom hook for easy consumption
export const useStations = () => {
  const context = useContext(StationContext);
  if (context === undefined) {
    throw new Error(
      "[Context - Station] useStations must be used within a StationProvider",
    );
  }
  return context;
};
