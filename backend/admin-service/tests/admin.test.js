const request = require("supertest");
const app = require("../server.js");
const { createDatabaseTable } = require("../models/adminModel");



createDatabaseTable();

describe("Admin Service API", () => {
  it("POST /api/admin/events creates a new event", async () => {
    const res = await request(app)
      .post("/api/admin/events")
      .send({
        eventName: "Study Sesh",
        eventDate: "2025-11-11",
        numTickets: 147,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.eventName).toBe("Study Sesh");
  });
});

createDatabaseTable();

describe("Admin Service API", () => {
  it("POST /api/admin/events creates a new event", async () => {
    const res = await request(app)
      .post("/api/admin/events")
      .send({
        eventName: "Please work",
        eventDate: "2025-11-11",
        numTickets: 147,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.eventName).toBe("Please work");
  });
});

createDatabaseTable();

describe("Admin Service API", () => {
  it("POST /api/admin/events creates a new event", async () => {
    const res = await request(app)
      .post("/api/admin/events")
      .send({
        eventName: "Anna working on tests",
        eventDate: "2025-11-17",
        numTickets: 147,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.eventDate).toBe("2025-11-17");
  });
});