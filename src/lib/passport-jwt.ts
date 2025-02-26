import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import { findUserById } from '../services/user';
import { RequestHandler } from 'express';
import passport from 'passport';
import { User } from '../types/types.user';

const options = { 
    //De onde vem o JWT
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //Chave secreta
    secretOrKey: process.env.JWT_SECRET as string
};

export const jwtStrategy = new JWTStrategy(options, async (payload, done) => {
    console.log('payload: ', payload);
    const { id } = payload;

    const user = await findUserById(id);
    if(user){
        return done(null, user);
    } else {
         return done(null, false);
    }
});

export const jwtStrategyAuth: RequestHandler = (req, res, next) => {
    const authRequest = passport.authenticate('jwt',
        (err: any, user: User | false) => {
            if(user){
                req.user = user;
                next();
            }
            return res.status(401).json({message: 'Unauthorized by JWT'});
        }
    );
    authRequest(req, res, next);
}