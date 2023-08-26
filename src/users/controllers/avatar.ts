import { Request, Response } from "express";
import { User } from "../core";

async function avatar(req: Request, res: Response) {
  const { id } = req.params;
  const user = await User.Find(id);
  if (!user) return res.sendStatus(400);
  try {
    if (!user.avatar) return res.sendStatus(400);
  } catch (error) {
    user.avatar = null;
    user.save();
    return res.sendStatus(500);
  }

  return res.sendFile(user.avatar);
}

export default avatar;
