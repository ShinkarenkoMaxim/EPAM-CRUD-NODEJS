import { ServerResponse } from 'http';

export const successfulResponse = (res: ServerResponse, data: any) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(data);
};
