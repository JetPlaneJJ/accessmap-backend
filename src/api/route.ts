// Describes routing for the restaurants backend
import express from "express";
import db from "./users.controller";

const router = express.Router();

router.get('/', (_req, res) => {
    res.json({ info: 'Node.js, Express, and Postgres API' })
})
router.get('/anonymous', (_req, res) => {
    res.send("Hello Anonymous");
});
router.get('/user', (_req, res) =>{
    res.send("Hello User");
});
router.get('/admin', (_req, res) =>{
    res.send("Hello Admin");
});

router.get('/users', db.getUsers)
router.get('/users/:id', db.getUserById)
router.post('/users', db.createUser)
router.put('/users/:id', db.updateUser)
router.delete('/users/:id', db.deleteUser)

export default router;
