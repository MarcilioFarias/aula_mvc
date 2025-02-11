import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import passport from 'passport';
import mainRoute from './routes/route';
import { localStrategy } from './lib/user';

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.urlencoded({ extended: true }));

passport.use(localStrategy);
server.use(passport.initialize());

server.use(mainRoute);
server.get('/', (req, res)=>{
    res.status(404).json('Not Found');
});

server.listen(3000,()=>{
    console.log('Server is running on port 3000');
});