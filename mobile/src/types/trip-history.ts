// Define the shape of the data that will be used in the UI
export interface UITripHistory {
  id: string;
  start: string;
  end: string;
  bus: string;
  locations: string[];
  status: string;
  route: string;
  created: string;
  updated: string;
}
