import { UserData } from "@/users/core/types";
import { Request } from "express";

interface IAuthRequest extends Request {
  user: UserData;
}

export type AuthRequest = IAuthRequest | any;
