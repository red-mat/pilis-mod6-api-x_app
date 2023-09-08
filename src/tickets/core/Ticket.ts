import { Order } from "@/orders/core/OrderEntity";
import { Status } from "@/orders/core/constans";
import { MoreThan } from "typeorm";
import CodeMachine from "./CodeMachine";
import TicketEntity from "./TicketEntity";

const EXPIRED_TIME = 4 * 60 * 60 * 1000;
const LENGTH_CODE = 4;

class Ticket {
  private readonly entity: TicketEntity;

  constructor(entity: TicketEntity) {
    this.entity = entity;
  }

  private static async getOrder(id: string): Promise<Order | null> {
    const currentDate = new Date();
    const fourHoursAgo = new Date(currentDate.getTime() - EXPIRED_TIME);

    const where = {
      id,
      status: Status.FINISHED,
      updatedAt: MoreThan(fourHoursAgo),
    };

    try {
      const order = await Order.findOneBy(where);
      if (!order) return null;

      return order;
    } catch (error) {
      console.log(error);

      return null;
    }
  }

  private static async getCodes(): Promise<string[]> {
    const currentDate = new Date();
    const expiredLimit = new Date(currentDate.getTime() - EXPIRED_TIME);

    const where = {
      status: Status.FINISHED,
      updatedAt: MoreThan(expiredLimit),
    };

    const orders = await Order.findBy(where);
    if (!orders) return [];

    const tickets = [];
    for (const order of orders) {
      const ticket = await TicketEntity.findOneBy({ order: order });
      if (ticket) tickets.push(ticket);
    }

    const codes = tickets.map((t) => t.code);
    return codes;
  }

  private static async generateCode(): Promise<string> {
    const codes = await this.getCodes();
    const generator = new CodeMachine(codes);
    return generator.generateCode(LENGTH_CODE);
  }

  static async Generate(orderId: string): Promise<Ticket | null> {
    const order = await this.getOrder(orderId);
    if (!order) return null;

    const ticket = new TicketEntity();
    ticket.order = order;
    ticket.code = await this.generateCode();
    try {
      await ticket.save();
    } catch (error) {
      console.log(error);
      return null;
    }

    return new Ticket(ticket);
  }

  static async Find(id: string): Promise<Ticket | null> {
    const ticket = await TicketEntity.findOne({
      where: { id },
      relations: ["order"],
    });
    if (!ticket) return null;

    return new Ticket(ticket);
  }

  static async FindByCode(code: string): Promise<Ticket | null> {
    const tickets = await TicketEntity.find({
      where: { code },
      relations: ["order"],
    });

    if (!tickets.length) return null;

    const ticket = tickets
      .map((t) => new Ticket(t))
      .filter((t) => !t.isExpired())[0];
    if (!ticket) return null;

    return ticket;
  }

  isExpired(): boolean {
    const order = this.entity.order as Order;
    const currentTime = new Date().getTime();
    const orderUpdatedAt = order.updatedAt.getTime();

    const timeSinceLastUpdate = currentTime - orderUpdatedAt;
    const isExpired = timeSinceLastUpdate >= EXPIRED_TIME;

    return isExpired;
  }

  async updateCode(): Promise<void> {
    if (this.isExpired()) return;

    this.entity.code = await Ticket.generateCode();
    await this.entity.save();
  }

  isDelivered(): boolean {
    return this.entity.isDelivered;
  }

  async deliver() {
    if (this.isExpired()) return;
    if (this.isDelivered()) return;

    this.entity.isDelivered = true;
    await this.entity.save();
  }

  dto() {
    const id = this.entity.id;
    const isExpired = this.isExpired();
    const orderId = (this.entity.order as Order).id;
    const createAt = this.entity.createdAt;
    const isDelivered = this.entity.isDelivered;
    const code = this.entity.code;

    return { id, createAt, isDelivered, isExpired, code, orderId };
  }

  detailDto() {
    const order = this.entity.order as Order;

    const id = this.entity.id;
    const detail = order.orderDetail;
    console.log(order);

    return { id, detail };
  }
}

export default Ticket;
