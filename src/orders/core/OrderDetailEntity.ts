import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
} from "typeorm"
import { Order } from "./OrderEntity"
import { Product } from "@/products/core/ProductEntity"

@Entity()
export class OrderDetail extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  description: string

  @Column({ type: "decimal" })
  quantity: number

  @Column({ type: "decimal" })
  subTotal: number

  @CreateDateColumn()
  createdAt: Date

  @ManyToOne(() => Order, (order: Order) => order.orderDetail)
  order: Order

  @ManyToOne(() => Product, (product: Product) => product.orderDetail)
  product: Product
};
