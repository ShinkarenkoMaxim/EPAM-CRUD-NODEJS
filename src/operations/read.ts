import { User } from '../models/user.js';

export const getAll = (entities: User[]) => {
  return entities;
};

export const getOne = (entities: User[], entityId: string) => {
  return entities.filter((entity: User) => entity.id === entityId);
};
