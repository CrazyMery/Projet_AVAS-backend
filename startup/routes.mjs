import { json } from 'express';

import { apiKey, createApiKey, protect } from '../middleware/auth.mjs';
import users from "../routes/users.mjs"
import teams from "../routes/teams.mjs";
import infos from "../routes/infos.mjs";

export default function(app) {
  app.use(json());
  // app.use('/api/generateAPIkey', (req, res)=>{
    //  const key = createApiKey(process.env.API_KEY_GEN);
    //  res.json({key : key});
    //  res.status(200);
    //  res.end();
    // })
    app.use('/api/users',apiKey, users);
    app.use("/api/teams", teams);
    app.use("/api/infos", infos);
}