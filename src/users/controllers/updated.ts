import { Response } from "express";
import { User } from "../core";
import { UserModel } from "../core/types";
import { AuthRequest } from "../middleware/authenticate";

const message = (message: string) => ({ message });

async function updated(req: AuthRequest, res: Response) {
  const img = req.file;

  const { id } = req.user;
  const data: Partial<UserModel> = req.body;

  if (!data.username && !data.password && !img)
    return res.status(400).send(message("params not valid"));

  const user = await User.Find(id);
  if (!user) return res.status(400).send(message("user not valid"));

  if (data.username) user.username = data.username;
  if (data.password) user.password = data.password;
  if (img) user.avatar = img;

  try {
    await user.save();
  } catch (error) {
    console.log(error);
    return res.status(500).send(message("internal error fail updated user"));
  }

  return res.status(200).send(message(`The user ${id} has been updated.`));
}

export default updated;
