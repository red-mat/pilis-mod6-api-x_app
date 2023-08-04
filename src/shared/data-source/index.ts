import ENV from "@/shared/environment";
import { DataSource } from "typeorm";

const ENTITY_PATHS = "src/*/core/**/*Entity.ts";

const AppDataSource = new DataSource({
  type: "mysql",
  host: ENV.DB_HOST,
  port: Number(ENV.DB_PORT),
  username: "root",
  password: ENV.DB_PASS,
  database: ENV.DB_NAME,
  synchronize: true,
  entities: [ENTITY_PATHS],
});

export default AppDataSource;
