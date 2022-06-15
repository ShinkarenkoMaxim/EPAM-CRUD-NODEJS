import http, { IncomingMessage, ServerResponse } from 'http';
import { resolve } from 'path';
import * as dotenv from 'dotenv';

const envPath = resolve(process.cwd(), '.env');

import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
} from './controllers/user.js';
import { notFoundError } from './utils/errorsNotifiers.js';

dotenv.config({ path: envPath });

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
  // Check if user sent request to right base path
  if (req.url.startsWith('/api')) {
    const endpoint = req.url.split('/')[2];

    if (endpoint === 'users') {
      switch (req.method) {
        case 'GET':
          const hasId = req.url.split('/')[3];
          if (hasId) {
            getUserById(req, res);
          } else {
            getAllUsers(req, res);
          }

          break;
        case 'POST':
          createUser(req, res);

          break;
        case 'PUT':
          updateUser(req, res);

          break;
        default:
          notFoundError(res);

          break;
      }
    }
  } else {
    notFoundError(res);
  }
};

const server = http.createServer(requestListener);

server.listen(process.env.PORT, () => {
  console.log(`Server has been started on ${process.env.PORT} port`);
});
