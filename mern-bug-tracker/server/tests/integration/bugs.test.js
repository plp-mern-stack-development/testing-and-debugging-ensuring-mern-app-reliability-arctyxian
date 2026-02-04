const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../../src/app");
const Bug = require("../../src/models/Bug");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Bug.deleteMany();
});

describe("/api/bugs", () => {
  test("creates a bug", async () => {
    const response = await request(app)
      .post("/api/bugs")
      .send({ title: "Button not clickable", description: "Save button fails" });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe("Button not clickable");
  });

  test("returns validation error", async () => {
    const response = await request(app).post("/api/bugs").send({ title: "" });
    expect(response.status).toBe(400);
  });

  test("updates a bug status", async () => {
    const bug = await Bug.create({ title: "Login issue" });
    const response = await request(app)
      .patch(`/api/bugs/${bug._id}`)
      .send({ status: "resolved" });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("resolved");
  });

  test("deletes a bug", async () => {
    const bug = await Bug.create({ title: "Crash on load" });
    const response = await request(app).delete(`/api/bugs/${bug._id}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Bug removed");
  });
});