import dotenv from "dotenv";
import { type Environment } from "./types";

dotenv.config();

const env = process.env as Partial<Environment>;

export const API_PORT = Number(env.API_PORT);
export const API_ROOT = env.API_ROOT ?? "/";

export const DB_HOST = env.DB_HOST ?? "localhost";
export const DB_PORT = Number(env.DB_PORT);
export const DB_NAME = env.DB_NAME ?? "db";
export const DB_PASS = env.DB_PASS ?? "password";

const ENV: Environment = {
  API_PORT,
  API_ROOT,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_PASS,
};

export default ENV;
