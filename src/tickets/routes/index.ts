import { Router } from "express";
import { generateTicket, getTickets } from "../controllers";

const PATH = "/tickets";

const ticketRoute = Router();

const pathPost = `${PATH}/:orderId`;
ticketRoute.post(pathPost, generateTicket);
ticketRoute.get(PATH, getTickets);

export default ticketRoute;
