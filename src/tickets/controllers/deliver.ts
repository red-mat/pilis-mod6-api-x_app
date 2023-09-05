import { Request, Response } from "express";
import { Ticket } from "../core";

function body(message: string) {
  return { message };
}

async function deliver(req: Request, res: Response) {
  const { ticketId } = req.body;
  const ticket = await Ticket.Find(ticketId);

  if (!ticket) return res.status(404).send(body("ticket not found"));
  if (ticket.isDelivered())
    return res.status(403).send(body("it was delivered"));
  if (ticket.isExpired())
    return res.status(403).send(body("The ticket has expired or is not valid"));

  await ticket.deliver();
  return res.send(body("Successful delivery"));
}

export default deliver;
