export interface Ticket {
  id: string;
  title: string;
  code: string;
  type: "Liên tuyến" | "Đơn tuyến";
  month: string;
  routeInfo?: string;
}
