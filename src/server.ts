import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import passport from 'passport';
import mainRoute from './routes/route';
import { localStrategy } from './lib/user';
import { bearerStrategy } from './lib/passort-bearer';
import { jwtStrategy } from './lib/passport-jwt';

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.urlencoded({ extended: true }));

passport.use(bearerStrategy);
passport.use(localStrategy);
passport.use(jwtStrategy);
server.use(passport.initialize());

server.use(mainRoute);
server.get('/', (req, res)=>{
    res.status(404).json('Not Found');
});

server.listen(3000,()=>{
    console.log('http://localhost:3000');
});