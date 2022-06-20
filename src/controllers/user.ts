import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';

import { UserCollection } from '../models/user.js';

import { successfulResponse } from '../utils/responseNotifiers.js';
import {
  internalServerError,
  invalidSyntaxError,
  missedBodyError,
  notValidUserIdError,
  requiredFieldsError,
  userIsNotExistError,
} from '../utils/errorsNotifiers.js';
import { getPostData } from '../utils/postData.js';

const userCollection = new UserCollection();

export const getAllUsers = (
  req: IncomingMessage,
  res: ServerResponse
): void => {
  try {
    const users = JSON.stringify(userCollection.collection);

    successfulResponse(res, 200, users);
  } catch (err) {
    console.log(err);

    internalServerError(res);
  }
};

export const getUserById = (
  req: IncomingMessage,
  res: ServerResponse
): void => {
  try {
    const userId = req.url.split('/')[3];
    const isValidUUID = validate(userId);

    if (isValidUUID) {
      const user = userCollection.getById(userId);

      if (user) {
        successfulResponse(res, 200, JSON.stringify(user));
      } else {
        userIsNotExistError(res);
      }
    } else {
      notValidUserIdError(res);
    }
  } catch (err) {
    console.log(err);

    internalServerError(res);
  }
};

export const createUser = async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> => {
  try {
    const body = await getPostData(req);

    // Check if body is not empty
    if (body) {
      const data = JSON.parse(body);
      const hasRequiredFields =
        'username' in data && 'age' in data && 'hobbies' in data;

      // Check if has required fields
      if (hasRequiredFields) {
        const user = JSON.stringify(userCollection.create(data));

        successfulResponse(res, 201, user);
      } else {
        requiredFieldsError(res);
      }
    } else {
      missedBodyError(res);
    }
  } catch (err) {
    // Handle invalid JSON. Otherwise handle Internal Error
    if (err instanceof SyntaxError) {
      invalidSyntaxError(res, err.message);
    } else {
      internalServerError(res);
    }
  }
};

export const updateUser = async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> => {
  try {
    const userId = req.url.split('/')[3];

    // Check if valid UUID
    const isValidUUID = validate(userId);
    if (!isValidUUID) {
      notValidUserIdError(res);
      return;
    }

    // Check if user exist
    const hasUser = userCollection.getById(userId);
    if (!hasUser) {
      userIsNotExistError(res);
      return;
    }

    const body = await getPostData(req);

    // Check if body is not empty
    if (body) {
      const data = JSON.parse(body);
      const hasRequiredFields =
        'username' in data && 'age' in data && 'hobbies' in data;

      // Check if has required fields
      if (hasRequiredFields) {
        const user = JSON.stringify(userCollection.update(userId, data));

        successfulResponse(res, 200, user);
      } else {
        requiredFieldsError(res);
      }
    } else {
      missedBodyError(res);
    }
  } catch (err) {
    // Handle invalid JSON. Otherwise handle Internal Error
    if (err instanceof SyntaxError) {
      invalidSyntaxError(res, err.message);
    } else {
      internalServerError(res);
    }
  }
};

export const deleteUser = async (
  req: IncomingMessage,
  res: ServerResponse
): Promise<void> => {
  try {
    const userId = req.url.split('/')[3];

    // Check if valid UUID
    const isValidUUID = validate(userId);
    if (!isValidUUID) {
      notValidUserIdError(res);
      return;
    }

    // Check if user exist
    const hasUser = userCollection.getById(userId);
    if (!hasUser) {
      userIsNotExistError(res);
      return;
    }

    userCollection.delete(userId);

    successfulResponse(res, 204);
  } catch (err) {
    // Handle invalid JSON. Otherwise handle Internal Error
    if (err instanceof SyntaxError) {
      invalidSyntaxError(res, err.message);
    } else {
      internalServerError(res);
    }
  }
};
