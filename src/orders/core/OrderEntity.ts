import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Status } from "./constans";
import { UserEntity } from "@/users/core";
import { OrderDetail } from "./OrderDetailEntity";


@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.PENDING
  })
  status: Status;

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.order)
  user: UserEntity | number

  @OneToMany(() => OrderDetail, (orderDetail: OrderDetail) => orderDetail.order)
  orderDetail: OrderDetail[]
};
