import bcrypt from "bcrypt";
import { UserCredentials, UserModel } from "./types";
import UserEntity from "./UserEntity";

const SALT_ROUNDS = 10;
const hashed = (text: string) => bcrypt.hashSync(text, SALT_ROUNDS);
const compared = (text: string, hash: string) => bcrypt.compareSync(text, hash);

class User {
  private _entity: UserEntity;

  private constructor(entity: UserEntity) {
    this._entity = entity;
  }

  static New({ username, password, avatar = null }: UserModel): User {
    const user = new UserEntity();
    user.username = username;
    user.password = hashed(password);
    user.avatar = avatar;

    return new User(user);
  }

  static async Find(id: string): Promise<User | null> {
    try {
      const user = await UserEntity.findOneBy({ id, isDeleted: false });
      if (!user) return null;
      return new User(user);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  static async Auth({
    username,
    password,
  }: UserCredentials): Promise<User | null> {
    try {
      const user = await UserEntity.findOneBy({ username, isDeleted: false });
      if (!user || !compared(password, user.password)) return null;
      return new User(user);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  get avatar() {
    return this._entity.avatar;
  }

  set avatar(x: string | null) {
    this._entity.avatar = x;
  }

  get username() {
    return this._entity.username;
  }

  set username(x: string) {
    this._entity.username = x;
  }

  get password() {
    return this._entity.password;
  }

  set password(x: string) {
    this._entity.password = hashed(x);
  }

  async save(): Promise<void> {
    this._entity.save();
  }

  auth(credentials: UserCredentials): boolean {
    if (credentials.username !== this._entity.username) return false;
    if (!compared(credentials.password, this._entity.password)) return false;

    return true;
  }

  getModel() {
    const { id, username, password, avatar } = this._entity;
    return {
      id,
      username,
      password,
      avatar,
    };
  }
}

export default User;
