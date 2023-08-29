import { Order } from "@/orders/core/OrderEntity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "ticket" })
class TicketEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 4 })
  code: string;

  @Column({ default: false })
  isDelivered: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @JoinColumn()
  @OneToOne(() => Order)
  order: Order | string;
}

export default TicketEntity;
