import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { API_PORT, API_ROOT, JWT_SECRET_KEY } from "@/shared/environment";
import { UserCredentials, UserData } from "../core/types";
import { User, UserEntity } from "../core";

function message(text: string) {
  return { message: text };
}

async function getUser(username: string): Promise<UserEntity | null> {
  return await UserEntity.findOneBy({ username });
}

function getAvatar(user: UserEntity) {
  if (!user.avatar) return null;
  return `http://localhost:${API_PORT}${API_ROOT}/v1/users/avatar/${user.id}`;
}

function generarToken(user: UserEntity): string {
  const payload: UserData = {
    id: user.id,
    username: user.username,
    avatar: getAvatar(user),
  };
  return jwt.sign(payload, JWT_SECRET_KEY);
}

async function authenticate(req: Request, res: Response) {
  const credentials: UserCredentials = req.body;

  let userEntity;
  try {
    userEntity = await getUser(credentials.username);
  } catch (error) {
    console.log(error);
    return res.status(500).send(message("internal error fail get user"));
  }

  if (!userEntity)
    return res.status(400).send(message("credentials not valid"));

  const user = new User(userEntity);
  if (!user.auth(credentials))
    return res.status(400).send(message("credentials not valid"));

  const token = generarToken(userEntity);
  return res.send({ token });
}

export default authenticate;
