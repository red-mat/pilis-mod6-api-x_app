import { Request, Response } from "express";
import OrderService from "../core/order";
import { Order } from "../core/OrderEntity";

export const get = async (req: Request, res: Response) => {
  try {
    if (req.params.orderId) {
      const order = await new OrderService().get(req.params.orderId);
      if (!order) return res.send("The order no exist");
      return res.status(200).json(order);
    }
    const orderList: Order[] = await new OrderService().getList();
    res.status(200).json(orderList);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const orderCreate = await new OrderService().create(req.body);
    res.status(200).json(orderCreate);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    await new OrderService().update(req.params.orderId, req.body);
    res.status(200).json({ msg: "Updated order" });
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};
