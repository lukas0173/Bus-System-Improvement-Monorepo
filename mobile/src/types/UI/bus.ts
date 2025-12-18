export interface UIBus {
  id: string;
  name: string;
  licensePlate: string;
  lastUpdate: string;
  position: string;
  current_route: string;
  status: "active" | "stopped";
  capacity: string;
}
