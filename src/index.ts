import "reflect-metadata";

import AppDataSource from "@/shared/data-source";
import { API_PORT } from "@/shared/environment";
import { userSetup } from "@/users/core";

import app from "app";
import { Storage } from "./shared/storage";

async function main() {
  const port = API_PORT;

  try {
    await AppDataSource.initialize();
    await userSetup();
    Storage.setup();
    app.listen(port);
  } catch (error) {
    console.log(error);
  }
}

void main();
