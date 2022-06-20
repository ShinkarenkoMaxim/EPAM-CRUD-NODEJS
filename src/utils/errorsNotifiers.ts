import { ServerResponse } from 'http';

export const notFoundError = (res: ServerResponse): void => {
  res.statusCode = 404;
  res.end();
};

export const missedBodyError = (res: ServerResponse): void => {
  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      ok: false,
      message: 'Request does not contain the body',
    })
  );
};

export const requiredFieldsError = (res: ServerResponse): void => {
  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      ok: false,
      message: 'Body does not contain the required fields',
    })
  );
};

export const internalServerError = (res: ServerResponse) => {
  res.statusCode = 500;
  res.end();
};

export const invalidSyntaxError = (res: ServerResponse, msg: string) => {
  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      ok: false,
      message: msg,
    })
  );
};

export const notValidUserIdError = (res: ServerResponse) => {
  res.writeHead(400, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      ok: false,
      message: 'Not valid userId',
    })
  );
};

export const userIsNotExistError = (res: ServerResponse) => {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(
    JSON.stringify({
      ok: false,
      message: 'User is not exist.',
    })
  );
};
