import request from "supertest";
import app from "@src/app";
import { appConfig } from "@src/utils/config";
import { closeDB, connectDB } from "@src/services/db";

describe("Testing APIs", () => {
  const newTxData = {
    from: appConfig.SENDER_ADDRESS,
    to: appConfig.RECEIVER_ADDRESS,
    value: 0.000001,
  };

  const invalidTxData = {
    from: appConfig.INVALID_SENDER_ADDRESS,
    to: appConfig.SENDER_ADDRESS,
    value: 0.000001,
  };

  beforeAll(async () => {
    await connectDB();
  });
  afterAll(async () => {
    await closeDB();
  });
  it("should return 200 OK after fetching all transactions", async () => {
    const response = await request(app).get("/accounts");
    expect(response.status).toBe(200);
  });
  it("should return 200 OK after fetching balance of an eth account", async () => {
    const response = await request(app).get(`/balance/${newTxData.from}`);
    expect(response.status).toBe(200);
  });
  it("should return 400 if fetching balance of an invalid eth account", async () => {
    const response = await request(app).get(`/balance/${invalidTxData.from}`);
    expect(response.status).toBe(400);
  });
  it("should save from address if it does not exist and return 201 OK after after creating and signing new transaction", async () => {
    const response = await request(app)
      .post("/transactions")
      .expect("Content-type", /json/)
      .send(newTxData);
    expect(response.status).toBe(201);
  });

  it("should return 400 if any of the address is not valid when trying to create and sign new transaction", async () => {
    const response = await request(app)
      .post("/transactions")
      .expect("Content-type", /json/)
      .send(invalidTxData);
    expect(response.status).toBe(400);
  });
});
