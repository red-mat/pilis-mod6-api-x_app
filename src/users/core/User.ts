import bcrypt from "bcrypt";
import { UserCredentials, UserModel } from "./types";

const SALT_ROUNDS = 10;
const hashed = (text: string) => bcrypt.hashSync(text, SALT_ROUNDS);
const compared = (text: string, hash: string) => bcrypt.compareSync(text, hash);

class User {
  private _username: string;
  private _password: string;
  private _avatar: string | null;

  constructor({ username, password, avatar }: UserModel) {
    this._username = username;
    this._password = password;
    this._avatar = avatar;
  }

  static New({ username, password, avatar = null }: UserModel): User {
    const _username = username;
    const _password = hashed(password);

    return new User({ username: _username, password: _password, avatar });
  }

  get avatar() {
    return this._avatar;
  }

  set avatar(x: string | null) {
    this._avatar = x;
  }

  get username() {
    return this._username;
  }

  set username(x: string) {
    this._username = x;
  }

  get password() {
    return this._password;
  }

  set password(x: string) {
    this._password = hashed(x);
  }

  auth(credentials: UserCredentials): boolean {
    if (credentials.username !== this._username) return false;
    if (!compared(credentials.password, this._password)) return false;

    return true;
  }

  getModel() {
    return {
      username: this._username,
      password: this._password,
      avatar: this._avatar,
    };
  }
}

export default User;
