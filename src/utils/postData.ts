import { IncomingMessage } from 'http';

export const getPostData = (req: IncomingMessage): Promise<string> => {
  return new Promise((resolve, reject) => {
    let body: string = '';

    req.on('error', (err) => {
      reject(err);
    });

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      resolve(body);
    });
  });
};
