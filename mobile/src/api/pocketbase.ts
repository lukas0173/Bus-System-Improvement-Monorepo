import PocketBase from "pocketbase";

const pocketbaseURL = process.env.EXPO_PUBLIC_API_URL;

if (!pocketbaseURL) {
  throw new Error("[Error] PocketBase URL is not defined");
}

// Initialize PocketBase client
export const pocketbaseClient = new PocketBase(pocketbaseURL);
