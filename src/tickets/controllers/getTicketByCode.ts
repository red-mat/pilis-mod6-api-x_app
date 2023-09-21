import { Request, Response } from "express";
import { Ticket } from "../core";

const body = (message: string) => ({ message });

async function getTicketByCode(req: Request, res: Response) {
  const { code } = req.params;

  const ticket = await Ticket.FindByCode(code);
  if (!ticket) return res.status(400).send(body("invalid ticket or not found"));

  return res.send(ticket.dto());
}

export default getTicketByCode;
