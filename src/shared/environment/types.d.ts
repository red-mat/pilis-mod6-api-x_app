export type TypeConfection = "mysql" | "postgres";
export interface Environment {
  API_PORT: number;
  API_ROOT: string;
  DB_TYPE: TypeConfection;
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USER: string;
  DB_PASS: string;
  JWT_SECRET_KEY: string;
}
