import { OrderDetail } from "./OrderDetailEntity";

export type BodyOrder = {
    productId: string
    quantity: number
}

export type OrderItem = {
    id: string
    status: string
    total: number
    userId: number
    orderDetail?: OrderDetail[]
    products: BodyOrder[]
};
