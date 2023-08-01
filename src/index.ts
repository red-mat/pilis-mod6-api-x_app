import app from "app";

async function main() {
  const port = 3000;
  try {
    app.listen(port);
  } catch (error) {
    console.log(error);
  }
}

void main();
