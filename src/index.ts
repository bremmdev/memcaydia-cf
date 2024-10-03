import { Hono } from "hono";

const app = new Hono<{ Bindings: CloudflareBindings }>();

app.get("/", (c) => {
  return c.text("Hello Hono prod2!");
});

app.get("/api/games", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM games WHERE is_published = ?"
  )
    .bind(1)
    .all();

  console.log(results)

  return c.json(results);
});

export default app;
