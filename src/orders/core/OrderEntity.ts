import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Status } from "./constans";
import { OrderDetail } from "./OrderDetailEntity";

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.PENDING,
  })
  status: Status;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => OrderDetail, (orderDetail: OrderDetail) => orderDetail.order)
  orderDetail: OrderDetail[];
}
