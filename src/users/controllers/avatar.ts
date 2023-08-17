import { Request, Response } from "express";
import { UserEntity } from "../core";

async function avatar(req: Request, res: Response) {
  const { id } = req.params;
  const user = await UserEntity.findOneBy({ id: Number(id) });
  if (!user) return res.sendStatus(400);
  if (!user.avatar) return res.sendStatus(400);

  return res.sendFile(user.avatar);
}

export default avatar;
