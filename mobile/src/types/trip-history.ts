import type { Bus, Route } from "./pocketbase-types";

// history list
export interface UITripHistory {
  id: string;
  created: string;
  status: string;
  routeName: string;
  busName: string;
}

// History detail screen
export interface UITripHistoryDetail {
  id: string;
  start: string;
  end: string;
  bus: Bus;
  locations: string[];
  status: string;
  route: Route;
  created: string;
  updated: string;
}
