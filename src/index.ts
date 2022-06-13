import http, { IncomingMessage, ServerResponse } from 'http';
import { resolve } from 'path';
import * as dotenv from 'dotenv';

const envPath = resolve(process.cwd(), '.env');

dotenv.config({ path: envPath });

const requestListener = (req: IncomingMessage, res: ServerResponse) => {
  if (req.url.startsWith('/api')) {
    res.end('Welcome');
  } else {
    res.statusCode = 404;
    res.end();
  }
};

const server = http.createServer(requestListener);

server.listen(process.env.PORT, () => {
  console.log(`Server has been started on ${process.env.PORT} port`);
});
