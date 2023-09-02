import { Router } from "express";
import { generateTicket } from "../controllers";
import { Ticket } from "../core";

const PATH = "/tickets";

const ticketRoute = Router();

const pathPost = `${PATH}/:orderId`;
ticketRoute.post(pathPost, generateTicket);

export default ticketRoute;
