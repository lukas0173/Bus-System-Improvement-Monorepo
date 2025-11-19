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
  const startTime = performance.now();
  try {
    const records = await pocketbaseClient
      .collection(collectionName)
      .getFullList<T>(options);

    const endTime = performance.now();
    // Calculate the RTT in milliseconds
    const rtt = endTime - startTime;

    console.log(`[API - READ] Fetch all records RTT: ${rtt.toFixed(2)} ms`);

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
  options: RequestOptions = {},
): Promise<T[]> => {
  const startTime = performance.now();
  try {
    // Base filter created from the function parameters
    const baseFilter = `${fieldName} = '${fieldValue}'`;

    // Combine with any filter that might be passed in the options
    const finalFilter = options.filter
      ? `${options.filter} && ${baseFilter}`
      : baseFilter;

    console.log(options);
    const records = await pocketbaseClient
      .collection(collectionName)
      .getFullList<T>({
        ...options,
        filter: finalFilter,
      });

    const endTime = performance.now();
    // Calculate the RTT in milliseconds
    const rtt = endTime - startTime;

    console.log(
      `[API - READ] Fetch filtered records RTT: ${rtt.toFixed(2)} ms`,
    );

    console.log(
      `[API - READ] Successfully fetched filtered records from ${collectionName} where ${fieldName} is ${fieldValue}`,
    );
    return records;
  } catch (error) {
    console.error(
      `[API - READ] Error fetching filtered records from ${collectionName}:\n`,
      error,
    );
    throw error;
  }
};

export const fetchFirstListItem = async <T>(
  collectionName: CollectionsName,
  fieldName: string,
  fieldValue: any,
  options: RequestOptions = {},
): Promise<T> => {
  const startTime = performance.now();
  try {
    const baseFilter = `${fieldName} = '${fieldValue}'`;
    const finalFilter = options.filter
      ? `${options.filter} && ${baseFilter}`
      : baseFilter;

    const record = await pocketbaseClient
      .collection(collectionName)
      .getFirstListItem<T>(finalFilter, options);

    const endTime = performance.now();
    const rtt = endTime - startTime;
    console.log(`[API - READ] Fetch first list item RTT: ${rtt.toFixed(2)} ms`);
    console.log(
      `[API - READ] Successfully fetched the first record from ${collectionName} where ${fieldName} is ${fieldValue}`,
    );
    return record;
  } catch (error) {
    console.error(
      `[API - READ] Error fetching the first record from ${collectionName}:\n`,
      error,
    );
    throw error;
  }
};

// Fetch ALL records from a collection
export const fetchBusLocations = () =>
  fetchAllRecords<BusLocation>(CollectionsName.BusLocations);

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

// Fetch filtered records
export const fetchBusLocationsById = (id: string, options = {}) =>
  fetchFilteredRecords<BusLocation>(
    CollectionsName.BusLocations,
    "buses",
    id,
    options,
  );

export const fetchFirstBusLocationById = (id: string, options = {}) =>
  fetchFirstListItem<BusLocation>(
    CollectionsName.BusLocations,
    "buses",
    id,
    options,
  );
