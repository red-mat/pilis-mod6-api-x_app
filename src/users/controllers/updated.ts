import { Response } from "express";
import { User, UserEntity } from "../core";
import { UserModel } from "../core/types";
import { AuthRequest } from "../middleware/authenticate";
import mime from "mime";
import { Storage } from "@/shared/storage";

const message = (message: string) => ({ message });
const updateAvatar = (
  file: Express.Multer.File,
  userId: number
): string | null => {
  const storage = new Storage("avatar");
  const format = mime.extension(file.mimetype);
  const buffer = file.buffer;
  const name = `${userId}.${format}`;

  return storage.reWrite(buffer, name);
};

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
  if (img) {
    if (user.avatar) Storage.delete(user.avatar);
    user.avatar = updateAvatar(req.file, id);
  }

  user.username = user.username;
  user.password = user.password;
  user.avatar = user.avatar;

  try {
    await user.save();
  } catch (error) {
    console.log(error);
    return res.status(500).send(message("internal error fail updated user"));
  }

  return res.status(200).send(message(`The user ${id} has been updated.`));
}

export default updated;
