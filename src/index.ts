import "reflect-metadata";

import { API_PORT } from "@/shared/environment";
import AppDataSource from "@/shared/data-source";

import app from "app";

async function main() {
  const port = API_PORT;

  try {
    await AppDataSource.initialize();
    app.listen(port);
  } catch (error) {
    console.log(error);
  }
}

void main();
