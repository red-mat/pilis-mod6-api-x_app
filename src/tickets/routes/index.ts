import { authenticate } from "@/users/middleware/authenticate";
import { Router } from "express";
import {
  deliver,
  generateTicket,
  getTicket,
  getTickets,
  refresh,
} from "../controllers";

const PATH = "/tickets";

const ticketRoute = Router();

ticketRoute.get(PATH, getTickets);

const pathGetTicket = `${PATH}/:ticketId`;
ticketRoute.get(pathGetTicket, getTicket);

const pathPost = `${PATH}/:orderId`;
ticketRoute.post(pathPost, generateTicket);

const pathDeliver = `${PATH}/deliver/:ticketId`;
ticketRoute.put(pathDeliver, authenticate, deliver);

const pathRefresh = `${PATH}/refresh/:ticketId`;
ticketRoute.put(pathRefresh, refresh);

export default ticketRoute;
