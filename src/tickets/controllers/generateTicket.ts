import { Order } from "@/orders/core/OrderEntity";
import { Status } from "@/orders/core/constans";
import { Request, Response } from "express";
import { Ticket } from "../core";

function body(message: string) {
  return { message };
}

async function generateTicket(req: Request, res: Response) {
  const { orderId } = req.params;
  if (!orderId) return res.status(400).send(body("send order id"));

  const order = await Order.findOneBy({ id: orderId });
  if (!order) return res.status(404).send(body("order not found, invalid id"));
  if (order.status !== Status.FINISHED)
    return res.status(403).send(body("Order not finished"));

  const ticket = await Ticket.Generate(orderId);
  if (!ticket)
    return res
      .status(403)
      .send(
        body("The order is expired or there is already a ticket with its id")
      );

  return res.send(ticket.dto());
}

export default generateTicket;
