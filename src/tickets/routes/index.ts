import { authenticate } from "@/users/middleware/authenticate";
import { Router } from "express";
import { deliver, generateTicket, getTickets } from "../controllers";

const PATH = "/tickets";

const ticketRoute = Router();

ticketRoute.get(PATH, getTickets);

const pathPost = `${PATH}/:orderId`;
ticketRoute.post(pathPost, generateTicket);

const pathDeliver = `${PATH}/deliver/:ticketId`;
ticketRoute.put(pathDeliver, authenticate, deliver);

export default ticketRoute;
