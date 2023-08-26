import bcrypt from "bcrypt";
import { UserCredentials, UserModel } from "./types";
import UserEntity from "./UserEntity";
import { Storage } from "@/shared/storage";
import mime from "mime";

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

  get avatar(): string | null {
    const storage = new Storage("avatar");
    const name = this._entity.avatar;

    if (!name) return null;

    const path = storage.getPath(name);
    if (!path) throw new Error(`Avatar not exist: ${name}`);

    return path;
  }

  set avatar(x: Express.Multer.File | null) {
    if (!x) {
      this._entity.avatar = x;
      return;
    }

    const currentAvatar = this._entity.avatar;
    const storage = new Storage("avatar");
    const buffer = x.buffer;
    const format = mime.extension(x.mimetype);
    const name = `${this._entity.id}.${format}`;

    if (currentAvatar && storage.exists(currentAvatar))
      storage.delete(currentAvatar);

    const path = storage.save(buffer, name);
    if (!path) return;

    this._entity.avatar = name;
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
