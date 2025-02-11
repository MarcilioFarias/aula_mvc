import { Request, Response, NextFunction } from 'express';
import { loginUser } from '../services/user';

type Check = { approved: boolean; }

export const localAuth = async (req: Request, res: Response, next: NextFunction) => {
    const approved: Check = { approved: false };
    
    if(req.body.login && req.body.password) {
        const checkUSer = await loginUser(req.body.login, req.body.password);
        if(checkUSer) {
            approved.approved = true;
            if(approved.approved) {
                next();
            } 
        }
    } else {
        res.status(403).json({message: 'Something went wrong'});
    }
};