process.env.NODE_ENV = "test";


const request = require("supertest");
const app = require("../server.js");

describe("Client Service API", () => {
  it("GET /api/events returns a list of events", async () => {
    const res = await request(app).get("/api/events");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /api/events/:id/purchase reduces ticket count", async () => {
    //Create a fake event manually
    const sqlite3 = require("sqlite3").verbose();
    const path = require("path");
    const dbPath = path.join(__dirname, "../../shared-db/test.sqlite");
    const db = new sqlite3.Database(dbPath);

    const tickets = 10;
    const Event = `TestEvent_${Date.now()}`;

    await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO events (eventName, eventDate, numTickets)
         VALUES (?, ?, ?)`,
        [Event, "2025-10-11", tickets],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });

    //Get that event’s ID
    const eventRes = await request(app).get("/api/events");
    const mockEvent = eventRes.body.find((e) => e.eventName === Event);

    //Purchase one ticket
  const purchaseRes = await request(app)
  .post(`/api/events/${mockEvent.id}/purchase`)
  .send({})        // required
  .set("Content-Type", "application/json");

expect(purchaseRes.statusCode).toBe(200);
expect(purchaseRes.body.success).toBe(true);
expect(purchaseRes.body.ticketsRemaining).toBe(tickets - 1);


    db.close();
  });
});
