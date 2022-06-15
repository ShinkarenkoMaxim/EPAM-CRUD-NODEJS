import { IncomingMessage, ServerResponse } from 'http';

import { UserCollection } from '../models/user.js';

import { successfulResponse } from '../utils/responseNotifiers.js';
import {
  internalServerError,
  invalidSyntaxError,
  missedBodyError,
  requiredFieldsError,
} from '../utils/errorsNotifiers.js';
import { getPostData } from '../utils/postData.js';

const userCollection = new UserCollection();

export const getAllUsers = (req: IncomingMessage, res: ServerResponse) => {
  try {
    const users = JSON.stringify(userCollection.collection);

    successfulResponse(res, users);
  } catch (err) {
    console.log(err);

    internalServerError(res);
  }
};

export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
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

        successfulResponse(res, user);
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
