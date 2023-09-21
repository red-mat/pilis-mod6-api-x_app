import { Request, Response } from "express";
import OrderService from "../core/order";

export const get = async (req: Request, res: Response) => {
  const { orderId } = req.params;

  try {
    if (orderId) {
      const order = await OrderService.Find(orderId);
      if (!order) return res.send("The order no exist");
      return res.status(200).json(order.dto());
    }
    const orderList = await OrderService.GetList();
    const orders = orderList.map((o) => o.dto());

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getOrderByCode = async (req: Request, res: Response) => {
  const { code } = req.params;
  try {
    if (!code) return res.status(400).send({ msg: "code undefined" });
    const order = await OrderService.FindByCode(code);
    if (!order)
      return res.status(404).send({ msg: "order not found o code not valid" });
    return res.send(order.dto());
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

export const create = async (req: Request, res: Response) => {
  const { products } = req.body;
  try {
    const order = await OrderService.Create(products);
    if (!order) return res.status(500).send({ msg: "fail create order" });
    res.status(200).json(order.dto());
  } catch (error: any) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export const update = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const data = req.body;

  try {
    const order = await OrderService.Find(orderId);
    if (!order) return res.status(400).json({ msg: "order not found" });
    await order.update(data);
    res.status(200).json({ msg: "Updated order" });
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

export const refreshCode = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  if (!orderId) return res.status(400).send({ msg: "order id not valid" });

  try {
    const order = await OrderService.Find(orderId);

    if (!order) return res.status(400).send({ msg: "order not found" });
    if (order.isExpired())
      return res.status(403).send({ msg: "order is expired" });
    if (order.isDelivered())
      return res.status(403).send({ msg: "order is delivered" });

    await order.refreshCode();
    return res.send(order.dto());
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

export const deliverOrder = async (req: Request, res: Response) => {
  const { orderId } = req.params;
  if (!orderId) return res.status(400).send({ msg: "send valid order id" });

  try {
    const order = await OrderService.Find(orderId);

    if (!order) return res.status(404).send({ msg: "send order not found" });

    if (!order.isFinished())
      return res.status(400).send({ msg: `order in ${order.status()}` });
    if (order.isDelivered())
      return res.status(400).send({ msg: "order is delivered" });
    if (order.isExpired())
      return res.status(400).send({ msg: "order is expired" });

    await order.deliver();
    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};
