import { pocketbaseClient } from "./pocketbase";
import { CollectionsName, TripHistory } from "../types/pocketbase-types";

/**
 * Creates a new trip history record.
 * @param data The trip history data to create.
 * @returns The created trip history record.
 */
export const createTripHistory = async (data: any) => {
  try {
    console.log(data);
    const record = await pocketbaseClient
      .collection(CollectionsName.TripHistories)
      .create(data);
    return record;
  } catch (error) {
    console.error("Error creating trip history:", error);
    throw error;
  }
};
