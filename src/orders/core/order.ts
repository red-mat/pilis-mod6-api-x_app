import { Product } from "@/products/core/Entity";
import { Order } from "./OrderEntity";
import { BodyOrder, OrderItem } from "./types";
import { UserEntity } from "@/users/core";
import { OrderDetail } from "./OrderDetailEntity";
import { statuses } from "./constans";

export default class OrderService {

  async getList() {
    const orders: Order[] = await Order.find({
      relations: ["orderDetail"]
    });
    return orders;
  };

  async get(id: string) {
    const order = await Order.findOne({
      where: { id: id },
      relations: ["orderDetail"]
    })
    return order;
  };

  async _findProduct(id: string) {
    return Product.findOneBy({ id: id })
  };

  async _validateProductAndBuildDetail(products: BodyOrder[]) {
    const orderDetail: OrderDetail[] = [];
    const uniqueProducts = new Set();

    for (let i = 0; i < products.length; i++) {
      const product = await this._findProduct(products[i].productId);
      if (product) {
        const detail = new OrderDetail();
        detail.description = product.name
        detail.quantity = products[i].quantity
        detail.subTotal = products[i].quantity * product.price
        detail.product = product
        orderDetail.push(detail);

        uniqueProducts.add(product.id);
      }
      else
        throw new Error(`The product N°${i + 1} no exist`);
    };

    if (products.length > uniqueProducts.size)
      throw new Error("There are duplicated products in the order.");

    return orderDetail;
  };

  async create(data: OrderItem) {
    const { products, userId } = data;
    try {
      const user = await UserEntity.findOneBy({ id: userId });
      if (!user) throw new Error("The user no exist");

      let orderDetailList = await this._validateProductAndBuildDetail(products);

      const newOrder = new Order();
      newOrder.user = user.id;
      await newOrder.save();

      for (const detail of orderDetailList) {
        detail.order = newOrder;
        await detail.save();
      };
      return newOrder;

    } catch (error: any) {
      throw error;
    };
  };

  async update(orderId: string, data: any) {
    const { status } = data
    try {

      const order = await this.get(orderId);

      if (!order) throw new Error("The order no exist");

      for (let i = 0; i < statuses.length; i++) {
        if (!statuses.includes(status)) {
          throw new Error("The status is wrong ");
        }
        order.status = status;
        await Order.save(order);
      }
    } catch (error: any) {
      throw error;
    };
  };
};
