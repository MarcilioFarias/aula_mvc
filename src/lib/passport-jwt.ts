import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';

const options = { 
    //De onde vem o JWT
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    //Chave secreta
    secretOrKey: process.env.JWT_SECRET as string
};

export const jstStrategy = new JWTStrategy(options, async (payload, done) => {
    console.log('payload: ', payload);
});