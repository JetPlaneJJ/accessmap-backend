/*
* Name: Jay Lin
* Last Updated: 02/10/2022
* server.js acts as the entry point for the accessmap backend.
*/
import express from "express"
import session from "express-session";
import cors from "cors"
import initKeycloak from "./keycloak-config";
import 'dotenv/config'

const app = express();
const url = "/api/v1/";
const port = process.env.PORT || 3000;
const kc = initKeycloak(app, session)

app.use(kc.middleware()) // keycloak middleware
app.use(cors()); // CORS middleware
app.use(express.json()); // Express server parsing JSON

import router from "./api/route";
app.use(url, router)
app.set("port", port)
app.listen(port, () => {
  console.log(`App running at http://localhost:${port}${url}`)
})

export default app;