import express from "express";
import { createUser } from "../services/user";

const mainRounte = express.Router();

mainRounte.get('/ping', (req, res) => {
    res.json('pong');
});

mainRounte.post('/newuser', async (req, res) => {
    
    const newUser = await createUser({
        email: req.body.email,
        password: req.body.password
    })
    res.status(201).json(newUser);
    
});



export default mainRounte;