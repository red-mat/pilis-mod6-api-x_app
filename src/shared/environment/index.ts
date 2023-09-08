import dotenv from "dotenv";
import { TypeConfection, type Environment } from "./types";

dotenv.config();

const env = process.env as Partial<Environment>;

export const API_PORT = Number(env.API_PORT);
export const API_ROOT = env.API_ROOT ?? "/";

export const DB_HOST = env.DB_HOST ?? "localhost";
export const DB_PORT = Number(env.DB_PORT ?? 3306);
export const DB_SSL = Boolean(Number(env.DB_SSL ?? 0));
export const DB_NAME = env.DB_NAME ?? "db";
export const DB_USER = env.DB_USER ?? "root";
export const DB_PASS = env.DB_PASS ?? "password";
export const DB_TYPE = (env.DB_TYPE as TypeConfection) ?? "mysql";
export const JWT_SECRET_KEY = env.JWT_SECRET_KEY ?? "secret_key";

const ENV: Environment = {
  API_PORT,
  API_ROOT,
  DB_HOST,
  DB_SSL,
  DB_TYPE,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASS,
  JWT_SECRET_KEY,
};

export default ENV;
