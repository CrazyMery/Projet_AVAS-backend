import express from "express";
import db from "./startup/db.mjs";
import cors from "cors";
import { configDotenv } from "dotenv";
import usersRouter from "./routes/users.mjs";
import teamsRouter from "./routes/teams.mjs";
import infosRouter from "./routes/infos.mjs";
import testimonialsRouter from "./routes/testimonials.mjs";
import messageRouter from './routes/messages.mjs';

configDotenv();

const app = express();

app.use(cors());
app.use(express.json()); // to parse JSON body

db();

app.use("/api/users", usersRouter);
app.use("/api/teams", teamsRouter);
app.use("/api/infos", infosRouter);
app.use("/api/testimonials", testimonialsRouter);
app.use('/api/messages', messageRouter);

const port = process.env.PORT || 3900;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});

export default server;
