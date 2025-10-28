// Default Pocketbase record structure
export interface BaseRecord {
  id: string;
  collectionId: string;
  collectionName: string;
  expand?: { [key: string]: any };
}

// Collection: bus_locations
export interface BusLocation extends BaseRecord {
  latitude: number;
  longitude: number;
  created_at: string;
  buses: string; // Relation to 'buses'
}

// Collection: buses
export interface Bus extends BaseRecord {
  license_plate: string;
  capacity: number;
  status: string;
}

// Collection: notifications
export interface Notification extends BaseRecord {
  message: string;
  time: string;
  is_read: boolean;
  users: string; // Relation to 'users'
}

// Collection: pickup_requests
export interface PickupRequest extends BaseRecord {
  status: string;
  created_at: string;
  users: string; // Relation to 'users'
  stations: string; // Relation to 'stations'
  trips: string; // Relation to 'trips'
  buses: string; // Relation to 'buses'
}

// Collection: route_stations
export interface RouteStation extends BaseRecord {
  stop_order: any; // JSON field
  routes: string; // Relation to 'routes'
  stations: string; // Relation to 'stations'
}

// Collection: routes
export interface Route extends BaseRecord {
  name: string;
  description: string;
  created_at: string;
}

// Collection: stations
export interface Station extends BaseRecord {
  name: string;
  longitude: number;
  latitude: number;
  status: string;
}

// Collection: system_logs
export interface SystemLog extends BaseRecord {
  device_id?: string;
  log_level: string;
  log_message: string;
  created_at: string;
}

// Collection: trips
export interface Trip extends BaseRecord {
  start_time: string;
  end_time?: string;
  status: string;
  buses: string; // Relation to 'buses'
  routes: string; // Relation to 'routes'
}

// Enum for collection names to ensure type-safe queries
export enum Collections {
  BusLocations = "bus_locations",
  Buses = "buses",
  Notifications = "notifications",
  PickupRequests = "pickup_requests",
  RouteStations = "route_stations",
  Routes = "routes",
  Stations = "stations",
  SystemLogs = "system_logs",
  Trips = "trips",
}
