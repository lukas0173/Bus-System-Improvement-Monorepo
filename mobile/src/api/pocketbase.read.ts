import { pocketbaseClient } from "@api/pocketbase";
import { CollectionsName, RequestOptions } from "../types/pocketbase-types";
import type {
  BusLocation,
  Bus,
  Notification,
  PickupRequest,
  Route,
  RouteStation,
  Station,
  SystemLog,
  Trip,
} from "../types/pocketbase-types";

const fetchAllRecords = async <T>(
  collectionName: CollectionsName,
  options: RequestOptions = {},
): Promise<T[]> => {
  try {
    const records = await pocketbaseClient
      .collection(collectionName)
      .getFullList<T>(options);
    console.log(
      `[API - READ] Successfully fetched records from ${collectionName}`,
    );
    return records;
  } catch (error) {
    console.error(
      `[API - READ] Error fetching records from ${collectionName}:\n`,
      error,
    );
    throw error;
  }
};

export const fetchFilteredRecords = async <T>(
  collectionName: CollectionsName,
  fieldName: string,
  fieldValue: any,
  options: RequestOptions = {
    filter: "buses = 'jb5xemoa6u396x7'",
    sort: "-created_at",
  },
): Promise<T[]> => {
  const startTime = performance.now();
  try {
    const records = pocketbaseClient
      .collection(collectionName)
      .getFullList<T>(options);

    const endTime = performance.now();
    // Calculate the RTT in milliseconds
    const rtt = endTime - startTime;

    console.log(
      `[API - READ] Fetch filtered records RTT: ${rtt.toFixed(2)} ms`,
    );

    console.log(
      `[API - READ] Successfully fetched filtered records ${fieldName} from ${collectionName}`,
    );
    return records;
  } catch (error) {
    console.error(
      `[API - READ] Error fetching filtered records ${fieldName} from ${collectionName}:\n`,
      error,
    );
    throw error;
  }
};

export const updateButton = async (options: RequestOptions = {}) => {
  try {
    const records = await pocketbaseClient
      .collection("button")
      .update("4mmd7x25iuo3z3s", { logic: false });
    console.log(`[API - READ] Successfully update records from button`);
    return records;
  } catch (error) {
    console.error(`[API - READ] Error fetching records from button:\n`, error);
    throw error;
  }
};

// --- Export specific fetch functions for each collection ---
// Fetch ALL records from a collection
export const fetchBusLocations = () =>
  fetchAllRecords<BusLocation>(CollectionsName.BusLocations);

export const fetchBusLocationsById = (id: string) =>
  fetchFilteredRecords<BusLocation>(CollectionsName.BusLocations, "buses", id);

export const fetchBuses = () => fetchAllRecords<Bus>(CollectionsName.Buses);
export const fetchNotifications = () =>
  fetchAllRecords<Notification>(CollectionsName.Notifications);
export const fetchPickupRequests = () =>
  fetchAllRecords<PickupRequest>(CollectionsName.PickupRequests);
export const fetchRouteStations = () =>
  fetchAllRecords<RouteStation>(CollectionsName.RouteStations);
export const fetchRoutes = () => fetchAllRecords<Route>(CollectionsName.Routes);
export const fetchStations = () =>
  fetchAllRecords<Station>(CollectionsName.Stations);
export const fetchSystemLogs = () =>
  fetchAllRecords<SystemLog>(CollectionsName.SystemLogs);
export const fetchTrips = () => fetchAllRecords<Trip>(CollectionsName.Trips);
