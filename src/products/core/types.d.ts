import { OrderDetail } from "../../orders/core/OrderDetailEntity";

export type BodyOrder = {
  id: string;
  quantity: number;
};

export type OrderItem = {
  id: string;
  status: string;
  total: number;
  userId: string;
  orderDetail?: OrderDetail[];
  products: BodyOrder[];
};

export type DataImage = {
  folder: string;
  file: any;
  productId: string;
};
