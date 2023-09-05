import { Request, Response } from "express";
import { Ticket } from "../core";

function body(message: string) {
  return { message };
}

async function generateTicket(req: Request, res: Response) {
  const { orderId } = req.params;
  if (!orderId) return res.status(400).send(body("send order id"));

  const ticket = await Ticket.Generate(orderId);
  if (!ticket) return res.status(400).send(body("ticket not found"));

  return res.send(ticket.dto());
}

export default generateTicket;
