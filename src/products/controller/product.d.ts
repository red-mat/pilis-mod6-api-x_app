import { Product } from "../core/Entity";

export type ItemProduct = {
  id: string
  name: string
  price: number
  stock: number
};

export type ProductDetail = {
  description?: string
  quantity: number
  subTotal: number
  product?: Product
}
