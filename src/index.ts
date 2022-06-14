import http, { IncomingMessage, ServerResponse } from 'http';
import { resolve } from 'path';
import * as dotenv from 'dotenv';

const envPath = resolve(process.cwd(), '.env');

import { getAll, getOne } from './operations/read.js';
import { User } from './models/user.js';

dotenv.config({ path: envPath });

let inMemoryDB: User[] = [
  {
    id: '234234234',
    username: 'test',
    age: 20,
    hobbies: ['test'],
  },
];

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
  // Check if user sent request to right base path
  if (req.url.startsWith('/api')) {
    const endpoint = req.url.split('/')[2];
    const userId = req.url.split('/')[3];

    const ifBulkOperation = endpoint === 'users';
    const ifOperationWithOne = endpoint === 'user';

    let dataToAnswer;

    switch (req.method) {
      case 'GET':
        if (ifBulkOperation) {
          dataToAnswer = getAll(inMemoryDB);
        } else if (ifOperationWithOne) {
          dataToAnswer = getOne(inMemoryDB, userId);
        }

        break;
      case 'POST':
        break;
      case 'PUT':
        break;
      case 'DELETE':
        break;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });

    res.end(JSON.stringify(dataToAnswer));
  } else {
    res.statusCode = 404;
    res.end();
  }
};

const server = http.createServer(requestListener);

server.listen(process.env.PORT, () => {
  console.log(`Server has been started on ${process.env.PORT} port`);
});
