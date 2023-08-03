import { DataSource } from "typeorm";
import ENV from "@/shared/environment";

const AppDataSource = new DataSource({
  type: "mysql",
  host: ENV.DB_HOST,
  port: Number(ENV.DB_PORT),
  username: "root",
  password: ENV.DB_PASS,
  database: ENV.DB_NAME,
  synchronize: true,
  entities: [],
});

export default AppDataSource;
