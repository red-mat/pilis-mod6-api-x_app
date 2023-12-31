import { OrderDetail } from "@/orders/core/OrderDetailEntity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";


@Entity()
export class ProductEntity extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: "256" })
  name: string;

  @Column()
  price: number;

  @Column()
  stock: number;

  @Column({ type: "varchar", length: "256", nullable: true })
  image: string;

  @Column({ default: "generic" })
  category: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderDetail, (orderDetail: OrderDetail) => orderDetail.product)
  orderDetail: OrderDetail
};
