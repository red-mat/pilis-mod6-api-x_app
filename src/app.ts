import express from "express";

const app = express();

app.use("/", (req, res) => {
  return res.send("hola mundo");
});

export default app;
