import { Request, Response } from "express";
import { Ticket } from "../core";

const body = (message: string, { ...params } = {}) => ({ message, ...params });

async function refresh(req: Request, res: Response) {
  const { ticketId } = req.params;

  if (!ticketId) return res.status(500).send(body("send ticket id"));

  const ticket = await Ticket.Find(ticketId);
  if (!ticket) return res.status(404).send(body("ticket not found"));

  if (ticket.isExpired())
    return res.status(403).send(body("ticket is expired"));
  if (ticket.isDelivered())
    return res.status(403).send(body("ticket is delivered"));

  await ticket.updateCode();

  const code = ticket.dto().code;
  return res.status(200).send(body("update code ticket", { code }));
}

export default refresh;
