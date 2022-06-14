import { IncomingMessage, ServerResponse } from 'http';
import { UserCollection } from '../models/user.js';

const userCollection = new UserCollection();

export const getAllUsers = (req: IncomingMessage, res: ServerResponse) => {
  try {
    const users = JSON.stringify(userCollection.collection);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(users);
  } catch (err) {
    console.log(err);
  }
};

export const createUser = (req: IncomingMessage, res: ServerResponse) => {
  try {
    let body: string = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      if (body) {
        const data = JSON.parse(body); // TODO: add json validation
        const hasRequiredFields =
          'username' in data && 'age' in data && 'hobbies' in data;

        // Check if has required fields
        if (hasRequiredFields) {
          const user = JSON.stringify(userCollection.create(data));

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(user);
        } else {
          const errMsg = JSON.stringify({
            ok: false,
            message: 'Body does not contain the required fields',
          });

          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(errMsg);
        }
        res.end();
      } else {
        const errMsg = JSON.stringify({
          ok: false,
          message: 'Request does not contain body',
        });

        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(errMsg);
      }
    });
  } catch (err) {
    console.log(err);
  }
};
