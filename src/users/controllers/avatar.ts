import { Request, Response } from "express";
import { UserEntity } from "../core";
import { Storage } from "@/shared/storage";

async function resolveAvatarNotFound(user: UserEntity) {
  user.avatar = null;
  user.save();
}

async function avatar(req: Request, res: Response) {
  const { id } = req.params;
  const user = await UserEntity.findOneBy({ id });
  if (!user) return res.sendStatus(400);
  if (!user.avatar) return res.sendStatus(400);
  if (!Storage.exists(user.avatar)) {
    resolveAvatarNotFound(user);
    return res.sendStatus(500);
  }

  return res.sendFile(user.avatar);
}

export default avatar;
