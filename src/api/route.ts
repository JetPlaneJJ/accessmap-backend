// Describes routing for the restaurants backend
import express from "express";
import db from "./users.controller";

import { getKeycloak } from "../keycloak-config";

const router = express.Router();
const keycloak = getKeycloak();

//--------------------------------------------------------------------------------
// TESTING PURPOSES ONLY
router.get('/', (_req, res) => {
    res.json({ info: 'Test Accessmap backend' })
})
router.get('/anonymous', (_req, res) => { // test w/out auth or tokens
    res.send("Hello Anonymous");
});
router.get('/user', keycloak.protect('user'), (_req, res) => { 
    res.send("Hello User"); // res.keycloak.user for extra details
});
router.get('/admin', keycloak.protect('admin'), (_req, res) => {
    res.send("Hello Admin");
});
router.get('/all-user', keycloak.protect(['user','admin']), (_req, res) => {
    res.send("Hello Admin");
});
//--------------------------------------------------------------------------------
// keycloak will check/parse the token for you (user-specific)
router.get('/users', db.getUsers)
router.get('/users/:id', db.getUserById)
router.post('/users', db.createUser)
router.put('/users/:id', db.updateUser)
router.delete('/users/:id', db.deleteUser)
router.get("*", (_req, res) => { 
    res.status(404).json({ error: "Not Found" })
});

export default router
