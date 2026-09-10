import http from "node:http";
import pg from "pg";

const { Pool } = pg;
const port = Number(process.env.PORT ?? 3000);
const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ?? "postgres://postgres:postgres@localhost:5432/app",
});

const server = http.createServer(async (request, response) => {
  response.setHeader("content-type", "application/json");

  if (request.url !== "/" && request.url !== "/health") {
    response.statusCode = 404;
    response.end(JSON.stringify({ error: "not found" }));
    return;
  }

  try {
    const result = await pool.query("SELECT NOW() AS database_time");
    response.statusCode = 200;
    response.end(
      JSON.stringify({
        message: "Hello from Node and PostgreSQL!",
        databaseTime: result.rows[0].database_time,
      }),
    );
  } catch (error) {
    response.statusCode = 503;
    response.end(
      JSON.stringify({
        error: "database unavailable",
        detail: error instanceof Error ? error.message : String(error),
      }),
    );
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`API listening on port ${port}`);
});

const shutdown = async () => {
  server.close();
  await pool.end();
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
