export interface Bus {
  id: string;
  name: string;
  licensePlate: string;
  lastUpdate: string;
  position: string;
  status: "Hoạt động" | "Tạm dừng";
  capacity: string;
}
