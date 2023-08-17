export interface UserModel {
  username: string;
  password: string;
  avatar: string | null;
}
export interface UserCredentials {
  username: string;
  password: string;
}
export interface UserData {
  id: number;
  username: string;
  avatar: string | null;
}
