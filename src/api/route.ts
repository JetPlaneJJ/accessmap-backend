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
    res.send("Hello User");
});
router.get('/admin', keycloak.protect('admin'), (_req, res) => {
    res.send("Hello Admin");
});
router.get('/all-user', keycloak.protect(['user','admin']), (_req, res) => {
    res.send("Hello Admin");
});
//--------------------------------------------------------------------------------

router.get('/users', keycloak.protect(['admin']), db.getUsers)
router.get('/users/:id', keycloak.protect(['user','admin']), db.getUserById)
router.post('/users', keycloak.protect(['user','admin']), db.createUser)
router.put('/users/:id', keycloak.protect(['user','admin']), db.updateUser)
router.delete('/users/:id', keycloak.protect(['user','admin']), db.deleteUser)

export default router;
