import { Request, Response } from "express";
import { Ticket, TicketEntity } from "../core";

const RELATIONS = ["order", "order.orderDetail"];

async function getTickets(req: Request, res: Response) {
  const ticketEntities = await TicketEntity.find({ relations: RELATIONS });
  if (ticketEntities.length === 0) return [];

  const tickets = ticketEntities.map((t) => new Ticket(t));

  return res.send(tickets.map((t) => t.dto()));
}

export default getTickets;
