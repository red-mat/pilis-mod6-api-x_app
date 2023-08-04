import app from "@/app";
import request from "supertest";

describe("Testing app", () => {
  test("should response hello word", async () => {
    const response = await request(app).get("/api/v1").send();

    expect(response.status).toEqual(200);
    expect(response.text).toEqual("hola mundo");
  });
});
