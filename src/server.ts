import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.urlencoded({ extended: true }));

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.listen(3000,()=>{
    console.log('Server is running on port 3000');
});