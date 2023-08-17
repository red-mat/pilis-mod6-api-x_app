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

  const userEntity = new UserEntity();
  userEntity.username = user.username;
  userEntity.password = user.password;
  await userEntity.save();
};
