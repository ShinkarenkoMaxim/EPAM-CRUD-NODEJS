import { ServerResponse } from 'http';

export const successfulResponse = (
  res: ServerResponse,
  status: number,
  data?: any
) => {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(data);
};
