import bcrypt from "bcrypt";
import { UserCredentials, UserModel } from "./types";

const SALT_ROUNDS = 10;
const hashed = (text: string) => bcrypt.hashSync(text, SALT_ROUNDS);
const compared = (text: string, hash: string) => bcrypt.compareSync(text, hash);

class User {
  private _username: string;
  private _password: string;

  constructor({ username, password }: UserModel) {
    this._username = username;
    this._password = password;
  }

  static New({ username, password }: UserModel): User {
    const _username = username;
    const _password = hashed(password);

    return new User({ username: _username, password: _password });
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
    return { username: this._username, password: this._password };
  }
}

export default User;
