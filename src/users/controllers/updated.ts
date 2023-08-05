import { Response } from "express";
import { User, UserEntity } from "../core";
import { UserModel } from "../core/types";
import { AuthRequest } from "../middleware/authenticate";

const message = (message: string) => ({ message });
const getEntity = async (id: number) =>
  await UserEntity.findOneBy({ id, isDeleted: false });

async function updated(req: AuthRequest, res: Response) {
  const { id } = req.user;
  const data: Partial<UserModel> = req.body;

  if (!data.username && !data.password)
    return res.status(400).send(message("params not valid"));

  let userEntity;
  try {
    userEntity = await getEntity(id);
  } catch (error) {
    console.log(error);
    return res.status(500).send(message("internal error fail updated user"));
  }
  if (!userEntity) return res.status(400).send(message("user not valid"));

  const user = new User(userEntity);

  if (data.username) user.username = data.username;
  if (data.password) user.password = data.password;

  userEntity.username = user.username;
  userEntity.password = user.password;

  try {
    await userEntity.save();
  } catch (error) {
    console.log(error);
    return res.status(500).send(message("internal error fail updated user"));
  }

  return res.status(200).send(message(`The user ${id} has been updated.`));
}

export default updated;
