import { resolve } from 'path';
import * as dotenv from 'dotenv';
import { server } from './server.js';

const envPath = resolve(process.cwd(), '.env');

dotenv.config({ path: envPath });

server.listen(process.env.PORT, () => {
  console.log(`Server has been started on ${process.env.PORT} port`);
});
