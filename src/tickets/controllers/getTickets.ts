import { Request, Response } from "express";
import { Ticket, TicketEntity } from "../core";

async function getTickets(req: Request, res: Response) {
  const ticketEntities = await TicketEntity.find({ relations: ["order"] });
  if (ticketEntities.length === 0) return [];

  const tickets = ticketEntities.map((t) => new Ticket(t));

  return res.send(tickets.map((t) => t.dto()));
}

export default getTickets;
