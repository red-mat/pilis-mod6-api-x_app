import User from "./User";
import UserEntity from "./UserEntity";

const DEFAULT_USER = {
  username: "admin",
  password: "admin",
  avatar: null,
};

export default async () => {
  const users = await UserEntity.count();
  if (users) return;

  const user = User.New(DEFAULT_USER);
  await user.save();
};
