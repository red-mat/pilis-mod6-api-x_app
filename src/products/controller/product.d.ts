import { Product } from "../core/ProductEntity";

export type ItemProduct = {
  id: string
  name: string
  price: number
  stock: number
  category: string
};

export type ProductDetail = {
  description?: string
  quantity: number
  subTotal: number
  product?: Product
}
