import  { Express, RequestHandler } from 'express';
import passport from 'passport';

export const privateRoute: RequestHandler = (req, res, next) => { 
    if(req.headers.authorization) {
        let token = req.headers.authorization;
        console.log(token);
        if(token === 'token123'){
            return next();
        } else {
            res.status(403).json({message: 'Access denied'});
        }
    }    
};
