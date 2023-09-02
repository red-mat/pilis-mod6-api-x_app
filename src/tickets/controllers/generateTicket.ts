import { Request, Response } from "express";
import { Ticket } from "../core";

async function generateTicket(req: Request, res: Response) {
  const { orderId } = req.params;
  if (!orderId) return res.sendStatus(500);

  const ticket = await Ticket.Generate(orderId);
  if (!ticket) return res.sendStatus(400);

  return res.send(ticket.dto());
}

export default generateTicket;
