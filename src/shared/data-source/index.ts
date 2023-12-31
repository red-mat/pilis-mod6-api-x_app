import { DataSource } from "typeorm";

import ENV from "@/shared/environment";
import { UserEntity } from "@/users/core";
import { ProductEntity } from "@/products/core/ProductEntity";
import { Order } from "@/orders/core/OrderEntity";
import { OrderDetail } from "@/orders/core/OrderDetailEntity";

const ENTITY = [UserEntity, ProductEntity, Order, OrderDetail];

const AppDataSource = new DataSource({
  type: ENV.DB_TYPE,
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  username: ENV.DB_USER,
  password: ENV.DB_PASS,
  database: ENV.DB_NAME,
  synchronize: true,
  entities: ENTITY,
  ssl: ENV.DB_SSL,
});

export default AppDataSource;
