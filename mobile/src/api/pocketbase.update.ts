import { pocketbaseClient } from "./pocketbase";
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
  TripHistory,
  NotificationLed,
} from "../types/pocketbase-types";

const updateRecord = async <T>(
  collectionName: CollectionsName,
  id: string,
  body: Partial<T>,
  options: RequestOptions = {},
): Promise<T> => {
  try {
    const record = await pocketbaseClient
      .collection(collectionName)
      .update<T>(id, body, options);
    console.log(
      `[API - UPDATE] Successfully updated record ${id} in ${collectionName}`,
    );
    return record;
  } catch (error) {
    console.error(
      `[API - UPDATE] Error updating record ${id} in ${collectionName}:\n`,
      error,
    );
    throw error;
  }
};

export const updateBusLocation = (id: string, body: Partial<BusLocation>) =>
  updateRecord<BusLocation>(CollectionsName.BusLocations, id, body);

export const updateBus = (id: string, body: Partial<Bus>) =>
  updateRecord<Bus>(CollectionsName.Buses, id, body);

export const updateNotification = (id: string, body: Partial<Notification>) =>
  updateRecord<Notification>(CollectionsName.Notifications, id, body);

export const updatePickupRequest = (id: string, body: Partial<PickupRequest>) =>
  updateRecord<PickupRequest>(CollectionsName.PickupRequests, id, body);

export const updateRouteStation = (id: string, body: Partial<RouteStation>) =>
  updateRecord<RouteStation>(CollectionsName.RouteStations, id, body);

export const updateRoute = (id: string, body: Partial<Route>) =>
  updateRecord<Route>(CollectionsName.Routes, id, body);

export const updateStation = (id: string, body: Partial<Station>) =>
  updateRecord<Station>(CollectionsName.Stations, id, body);

export const updateSystemLog = (id: string, body: Partial<SystemLog>) =>
  updateRecord<SystemLog>(CollectionsName.SystemLogs, id, body);

export const updateTrip = (id: string, body: Partial<Trip>) =>
  updateRecord<Trip>(CollectionsName.Trips, id, body);

export const updateTripHistory = (id: string, body: Partial<TripHistory>) =>
  updateRecord<TripHistory>(CollectionsName.TripHistories, id, body);

export const updateNotificationLed = (
  id: string,
  body: Partial<NotificationLed>,
) => updateRecord<NotificationLed>(CollectionsName.NotificationLed, id, body);
