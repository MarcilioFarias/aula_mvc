import express from "express";
import { createUser, listUsers, listAllUsers, updateUser, deleteUser, loginUser } from "../services/user";
import { localAuth } from "../middleware/auth";
import { privateRoute } from "../middleware/local.auth";
import { localStratgyAuth } from "../lib/user";

const mainRoute = express.Router();

mainRoute.get('/ping', localAuth, (req, res) => {
    res.json('pong');
});

mainRoute.post('/newuser', privateRoute, async (req, res) => {
    
    const newUser = await createUser({
        email: req.body.email,
        password: req.body.password,
        loginUser: req.body.login
    });
    if(!newUser) {
        res.status(400).json({message: 'Error in creating user'});
    } else {
        res.status(201).json(newUser);
    }     
});

mainRoute.get('/listuser', async (req, res)=>{
    const listUser = await listUsers(req.query.email as string);
    
    if(listUser) {
        res.status(200).json({user: listUser});
    } else {
        res.status(404).json({message: 'User not found'});
    }
});

mainRoute.get('/listall', async (req, res) => {
    const allUsers = await listAllUsers();
    res.status(200).json({allUsers});
});

mainRoute.post('/updaterole', async (req, res)=>{
    const updateRole = await updateUser(req.body.email);
    if(updateRole) {
        res.status(201).json({user: updateRole});        
    } else {
        res.status(404).json({message: 'User not found'});
    }
});

mainRoute.delete('/deleteuser', async (req, res) => {
    const deleteUserResult = await deleteUser(req.body.email);
    if(deleteUserResult) {
        res.status(204).json({message: 'User deleted'});
    } else {
        res.status(404).json({message: 'User not found'});
    }          
});

mainRoute.post('/login', async (req, res) => {
    const checkLogin = await loginUser(req.body.login, req.body.password);
    if(checkLogin) {
        res.status(200).json({message: 'Login successful'});
    } else {
        res.status(403).json({message: 'Login failed'});
    }
});

mainRoute.post('/loginauth', localStratgyAuth ,async (req, res)=>{
    res.json({
        user: req.user,
        auth: req.authInfo
    });
});

export default mainRoute;