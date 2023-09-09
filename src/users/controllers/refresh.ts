import { API_HOST, JWT_SECRET_KEY } from "@/shared/environment";
import { Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../core";
import { UserData } from "../core/types";

function message(text: string) {
  return { message: text };
}

function getAvatar(user: any) {
  if (!user.avatar) return null;
  return `${API_HOST}/v1/users/avatar/${user.id}`;
}
function generarToken(user: any): string {
  const payload: UserData = {
    id: user.id,
    username: user.username,
    avatar: getAvatar(user),
  };
  return jwt.sign(payload, JWT_SECRET_KEY);
}

async function refresh(req: any, res: Response) {
  const id = <string>req.id;

  const user = await User.Find(id);
  if (!user) return res.status(400).send(message("credentials not valid"));

  const token = generarToken(user.getModel());
  return res.send({ token });
}

export default refresh;
