import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserModel } from "./types";
import { Order } from "@/orders/core/OrderEntity";

@Entity()
class UserEntity extends BaseEntity implements UserModel {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column()
  password!: string;

  @Column({ default: false })
  isDeleted!: boolean;

  @Column({ type: "varchar", length: 255, nullable: true })
  avatar: string | null;
  @OneToMany(() => Order, (order: Order) => order.user)
  order: Order
}

export default UserEntity;
