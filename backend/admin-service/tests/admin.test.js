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
