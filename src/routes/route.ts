import express from "express";
import { createUser, listUsers } from "../services/user";

const mainRoute = express.Router();

mainRoute.get('/ping', (req, res) => {
    res.json('pong');
});

mainRoute.post('/newuser', async (req, res) => {
    
    const newUser = await createUser({
        email: req.body.email,
        password: req.body.password
    });
    res.status(201).json(newUser);
    
});

mainRoute.post('/listusers', async (req, res)=>{
    const list = await listUsers(req.query.email as string);
    res.json(list);
})

export default mainRoute;