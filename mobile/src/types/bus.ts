export interface Bus {
  id: string;
  name: string;
  licensePlate: string;
  lastUpdate: string;
  position: string;
  status: "active" | "stopped";
  capacity: string;
}
