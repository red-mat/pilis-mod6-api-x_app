import { UserData } from "@/users/core/types";
import { Request } from "express";

export interface AuthRequest extends Request {
  user: UserData;
}
