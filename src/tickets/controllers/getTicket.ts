import { Request, Response } from "express";
import { Ticket } from "../core";

const body = (message: string, { ...params } = {}) => ({ message, ...params });

async function getTicket(req: Request, res: Response) {
  const { ticketId } = req.params;
  if (!ticketId) return res.status(400).send(body("send ticket id"));

  const ticket = await Ticket.Find(ticketId);
  if (!ticket) return res.status(404).send(body("ticket not found"));

  return res.send(ticket.dto());
}

export default getTicket;
