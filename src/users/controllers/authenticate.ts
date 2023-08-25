import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { API_PORT, API_ROOT, JWT_SECRET_KEY } from "@/shared/environment";
import { UserCredentials, UserData, UserModel } from "../core/types";
import { User, UserEntity } from "../core";

interface UserDto extends UserModel {
  id: string;
}

function message(text: string) {
  return { message: text };
}

async function getUser(username: string): Promise<UserEntity | null> {
  return await UserEntity.findOneBy({ username });
}

function getAvatar(user: UserDto) {
  if (!user.avatar) return null;
  return `http://localhost:${API_PORT}${API_ROOT}/v1/users/avatar/${user.id}`;
}
function generarToken(user: UserDto): string {
  const payload: UserData = {
    id: user.id,
    username: user.username,
    avatar: getAvatar(user),
  };
  return jwt.sign(payload, JWT_SECRET_KEY);
}

async function authenticate(req: Request, res: Response) {
  const credentials: UserCredentials = req.body;
  if (!credentials.password || !credentials.username)
    return res.status(400).send(message("credentials not valid"));

  const user = await User.Auth(credentials);
  if (!user) return res.status(400).send(message("credentials not valid"));

  const token = generarToken(user.getModel());
  return res.send({ token });
}

export default authenticate;
