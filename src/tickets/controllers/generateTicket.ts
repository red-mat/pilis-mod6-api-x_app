import { Request, Response } from "express";
import { Ticket } from "../core";
import { Order } from "@/orders/core/OrderEntity";

function body(message: string) {
  return { message };
}

async function generateTicket(req: Request, res: Response) {
  const { orderId } = req.params;
  if (!orderId) return res.status(400).send(body("send order id"));

  const order = await Order.findOneBy({ id: orderId });
  if (!order) return res.status(404).send(body("order not found, invalid id"));

  const ticket = await Ticket.Generate(orderId);
  if (!ticket) return res.status(403).send(body("Order is Expired"));

  return res.send(ticket.dto());
}

export default generateTicket;
