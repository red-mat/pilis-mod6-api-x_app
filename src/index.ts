import app from "app";
import { API_PORT } from "@/shared/environment";

async function main() {
  const port = API_PORT;

  try {
    app.listen(port);
  } catch (error) {
    console.log(error);
  }
}

void main();
