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

/**
 * A generic function to fetch all records from a specified collection.
 *
 * @param collection - The name of the collection to fetch from.
 * @param options - Optional Pocketbase request options (e.g., filter, sort).
 * @returns A promise that resolves to an array of records.
 */

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

/**
 * A generic function to fetch a record(s) by desired field
 *
 * @param collectionName - The name of the collection.
 * @param fieldName- The name of the field to filter.
 * @param fieldValue- The value of the field to filter.
 * @param options - Optional Pocketbase request options.
 * @returns A promise that resolves to a single record.
 */

export const fetchFilteredRecords = async <T>(
  collectionName: CollectionsName,
  fieldName: string,
  fieldValue: any,
  options: RequestOptions = {},
): Promise<T[]> => {
  try {
    // Append the filter option
    options.filter = `${fieldName} = ${fieldValue}`;
    const records = pocketbaseClient
      .collection(collectionName)
      .getFullList<T>(options);
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

// --- Export specific fetch functions for each collection ---
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
