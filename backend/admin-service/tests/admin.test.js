// Automated backend test suite for the Admin Service API. Uses Jest and Supertest to verify
// event creation requests. Integration between the testing of express server and the database 
// layer which validates proper request handling and data persistence for event management.

const request = require("supertest");
const app = require("../server.js");
const { createDatabaseTable } = require("../models/adminModel");



createDatabaseTable();

// Verifies request are correctly created in the system. Each test sends a unique payload
// and checks that it creates correct response.
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

describe("Admin Service API", () => {
  it("POST /api/admin/events creates a new event", async () => {
    const res = await request(app)
      .post("/api/admin/events")
      .send({
        eventName: "Final Day",
        eventDate: "2025-12-05",
        numTickets: 45,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.eventDate).toBe("2025-12-05");
  });
});

describe("Admin Service API", () => {
  it("POST /api/admin/events creates a new event", async () => {
    const res = await request(app)
      .post("/api/admin/events")
      .send({
        eventName: "Halloween Night",
        eventDate: "2025-10-31",
        numTickets: 500,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.eventName).toBe("Halloween Night");
  });
});
