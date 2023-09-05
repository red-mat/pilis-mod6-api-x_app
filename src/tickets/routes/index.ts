import { Router } from "express";
import { generateTicket, getTickets } from "../controllers";

const PATH = "/tickets";

const ticketRoute = Router();

ticketRoute.get(PATH, getTickets);

const pathPost = `${PATH}/:orderId`;
ticketRoute.post(pathPost, generateTicket);

export default ticketRoute;
