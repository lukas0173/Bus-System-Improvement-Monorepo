import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { fetchRoutes } from "@api/pocketbase.read";
import { Route as PBRoute } from "@/src/types/pocketbase-types";
import { UIRoute } from "../types/UI/route";

// Define the shape of the context state
interface RouteContextType {
  routes: UIRoute[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

// Context initialization
const RouteContext = createContext<RouteContextType | undefined>(undefined);

// Context provider
export const RouteProvider = ({ children }: { children: ReactNode }) => {
  const [routes, setRoutes] = useState<UIRoute[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Define the data fetching and processing function
  const fetchAndProcessRoutes = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch all routes
      const rawRoutes = await fetchRoutes();

      // Map to UI type
      const processedRoutes = rawRoutes.map((route: PBRoute) => {
        let parsedPath = [];
        try {
          // Check if route.path_json is a string or already an object (PB SDK behavior varies)
          // Assuming it's a JSON string as per schema
          parsedPath =
            typeof route.path_json === "string"
              ? JSON.parse(route.path_json)
              : route.path_json;
        } catch (e) {
          console.warn(
            `[Context - Route] Failed to parse path_json for route ${route.id}`,
            e,
          );
        }

        return {
          id: route.id,
          name: route.name,
          description: route.description,
          status: route.status,
          pathJson: parsedPath,
          code: route.code,
        };
      });

      setRoutes(processedRoutes);
    } catch (err) {
      console.error("[Context - Route] Error fetching data:", err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch data on component mount
  useEffect(() => {
    fetchAndProcessRoutes();
  }, [fetchAndProcessRoutes]);

  const value = {
    routes,
    isLoading,
    error,
    refetch: fetchAndProcessRoutes,
  };

  return (
    <RouteContext.Provider value={value}>{children}</RouteContext.Provider>
  );
};

// Create a custom hook for easy consumption
export const useRoutes = () => {
  const context = useContext(RouteContext);
  if (context === undefined) {
    throw new Error(
      "[Context - Route] useRoutes must be used within a RouteProvider",
    );
  }
  return context;
};
