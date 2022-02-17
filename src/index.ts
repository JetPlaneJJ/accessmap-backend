/*
* Name: Jay Lin
* Last Updated: 02/10/2022
* server.js acts as the entry point for the accessmap backend.
*/
import express from "express"
import cors from "cors"
import router from "./api/route"
import initKeycloak from "./keycloak/keycloak-config";
import 'dotenv/config'

const app = express();
const url = "/api/v1/";
const port = 3000;

app.use(initKeycloak().middleware())
app.use(cors()); // middleware
app.use(express.json()); // Express server parsing JSON
app.use(url, router)

// Handle 404 Not Found pages
app.use("*", (_req, res) => res.status(404).json({
    error: "Not Found"
})); 
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

export default app;