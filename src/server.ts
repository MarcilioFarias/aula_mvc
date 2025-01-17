import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import mainRounte from './routes/route';

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.urlencoded({ extended: true }));

server.use(mainRounte);

server.listen(3000,()=>{
    console.log('Server is running on port 3000');
});