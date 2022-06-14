import http, { IncomingMessage, ServerResponse } from 'http';
import { resolve } from 'path';
import * as dotenv from 'dotenv';

const envPath = resolve(process.cwd(), '.env');

import { createUser, getAllUsers } from './controllers/user.js';

dotenv.config({ path: envPath });

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
  // Check if user sent request to right base path
  if (req.url.startsWith('/api')) {
    const endpoint = req.url.split('/')[2];

    if (endpoint === 'users') {
      if (req.method === 'GET') {
        getAllUsers(req, res);
      } else if (req.method === 'POST') {
        createUser(req, res);
      }
    }
  } else {
    res.statusCode = 404;
    res.end();
  }
};

const server = http.createServer(requestListener);

server.listen(process.env.PORT, () => {
  console.log(`Server has been started on ${process.env.PORT} port`);
});
