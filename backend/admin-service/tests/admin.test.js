const request = require("supertest");
const app = require("../server.js");

describe("Admin Service API", () => {
  it("POST /api/admin/events creates a new event", async () => {
    const res = await request(app)
      .post("/api/admin/events")
      .send({
        eventName: "Jazz Night",
        eventDate: "2025-12-15",
        numTickets: 10,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.eventName).toBe("Jazz Night");
  });
});
