import dotenv from "dotenv";
import app from "./routes/indexRoute.js";
import connectToDB from "./utils/connectToDB.js";
dotenv.config({ path: "./config/dev.env" });

const port = process.env.port;

app.listen(port, async () => {
  await connectToDB();
  console.log(`app started successfully at http://localhost:${port}`);
});
