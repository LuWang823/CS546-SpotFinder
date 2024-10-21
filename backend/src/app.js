process.on("uncaughtException", (err) => {
  console.error("uncaughtException, shutting down server");
  console.error(err);
  process.exit(1);
});

import dotenv from "dotenv";
import app from "./routes/indexRoute.js";
import connectToDB from "./utils/connectToDB.js";

dotenv.config({ path: `./config/${process.env.NODE_ENV}.env` });

const port = process.env.port;

const server = app.listen(port, async () => {
  await connectToDB();
  console.log(`app started successfully at http://localhost:${port}`);
});

process.on("unhandledRejection", (err) => {
  console.error("unhandledRejection, shutting down server");
  console.error(err);
  server.close(() => {
    process.exit(1);
  });
});
