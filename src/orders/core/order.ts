import { ProductEntity } from "@/products/core/ProductEntity";
import { MoreThan } from "typeorm";
import { BodyOrder } from "../../products/core/types";
import CodeMachine from "./CodeMachine";
import { OrderDetail } from "./OrderDetailEntity";
import { Order } from "./OrderEntity";
import { Status, statuses } from "./constans";

const EXPIRED_TIME = 4 * 60 * 60 * 1000;
const LENGTH_CODE = 4;
export default class OrderService {
  private readonly entity: Order;

  private static async getCodes(): Promise<string[]> {
    const currentDate = new Date();
    const expiredLimit = new Date(currentDate.getTime() - EXPIRED_TIME);

    const where = {
      isDelivered: false,
      updatedAt: MoreThan(expiredLimit),
    };

    const orders = await Order.findBy(where);
    if (!orders) return [];

    const codes = orders.map((o) => o.code);
    return codes;
  }

  private static async generateCode(): Promise<string> {
    const codes = await this.getCodes();
    const generator = new CodeMachine(codes);
    return generator.generateCode(LENGTH_CODE);
  }

  private static async _findProduct(id: string) {
    return ProductEntity.findOneBy({ id: id });
  }

  private static async _validateProductAndBuildDetail(products: BodyOrder[]) {
    const orderDetail: OrderDetail[] = [];
    const uniqueProducts = new Set();

    for (let i = 0; i < products.length; i++) {
      const product = await this._findProduct(products[i].id);
      if (product) {
        const detail = new OrderDetail();
        detail.description = product.name;
        detail.quantity = products[i].quantity;
        detail.subTotal = products[i].quantity * product.price;
        detail.product = product;
        orderDetail.push(detail);

        uniqueProducts.add(product.id);
      } else throw new Error(`The product N°${i + 1} no exist`);
    }

    if (products.length > uniqueProducts.size)
      throw new Error("There are duplicated products in the order.");

    return orderDetail;
  }

  static async GetDetail(id: string) {
    const orderDetail = await OrderDetail.findOne({
      where: { id: id },
      relations: ["product"],
    });
    return orderDetail;
  }

  static async Create(products: BodyOrder[]) {
    try {
      const orderDetailList = await this._validateProductAndBuildDetail(
        products
      );

      const order = new Order();
      order.code = await this.generateCode();
      await order.save();

      for (const detail of orderDetailList) {
        detail.order = order;
        await detail.save();
      }

      return OrderService.Find(order.id);
    } catch (error: any) {
      throw error;
    }
  }

  static async GetList() {
    const orders: Order[] = await Order.find({
      relations: ["orderDetail"],
    });
    return orders.map((o) => new OrderService(o));
  }

  static async Find(id: string) {
    const order = await Order.findOne({
      where: { id: id },
      relations: ["orderDetail"],
    });
    if (!order) return null;
    return new OrderService(order);
  }

  static async FindByCode(code: string) {
    if (code.length !== 4) return null;
    const orders = await Order.find({
      where: { code },
      relations: ["orderDetail"],
    });

    if (!orders.length) return null;

    const order = orders
      .map((o) => new OrderService(o))
      .filter((o) => !o.isExpired() && !o.isDelivered())[0];
    if (!order) return null;

    return order;
  }

  constructor(order: Order) {
    this.entity = order;
  }

  async update(data: any) {
    const { status } = data;
    try {
      const order = this.entity;

      if (!order) throw new Error("The order no exist");
      if (!statuses.includes(status.toLowerCase()))
        throw new Error("The status is wrong ");
      if (order.status === status.toLowerCase())
        throw new Error("The order already has that status");
      if (order.status === Status.FINISHED)
        throw new Error("Can not update a completed order");
      if (
        order.status === Status.PENDING &&
        status.toLowerCase() === Status.FINISHED
      )
        throw new Error("Can not finalize a pending order");

      order.status = status;
      await Order.save(order);
    } catch (error: any) {
      throw error;
    }
  }

  async refreshCode() {
    if (this.isExpired()) return null;

    try {
      const order = this.entity;
      order.code = await OrderService.generateCode();
      await order.save();

      return order.code;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async deliver() {
    if (this.isExpired()) return;
    if (this.isDelivered()) return;

    this.entity.isDelivered = true;
    await this.entity.save();
  }

  isExpired(): boolean {
    const order = this.entity;
    const currentTime = new Date().getTime();
    const orderUpdatedAt = order.updatedAt.getTime();

    const timeSinceLastUpdate = currentTime - orderUpdatedAt;
    const isExpired = timeSinceLastUpdate >= EXPIRED_TIME;

    return isExpired;
  }

  isFinished(): boolean {
    return this.entity.status === Status.FINISHED;
  }

  isDelivered(): boolean {
    return this.entity.isDelivered;
  }

  status(): string {
    return this.entity.status;
  }

  dto() {
    const order = this.entity;

    const id = this.entity.id;
    const code = this.entity.code;
    const status = this.entity.status;
    const isExpired = this.isExpired();
    const isDelivered = this.entity.isDelivered;
    const createAt = this.entity.createdAt;
    const updateAt = this.entity.updatedAt;
    const detail = order.orderDetail;

    return {
      id,
      code,
      status,
      isExpired,
      isDelivered,
      createAt,
      updateAt,
      detail,
    };
  }
}
