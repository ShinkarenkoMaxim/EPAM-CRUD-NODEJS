import { v4 as uuidv4 } from 'uuid';

export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[] | [];
}

export class UserCollection {
  collection: User[] = [];

  getById(id: string) {
    return this.collection.filter((user) => user.id === id);
  }

  create(data: User): User {
    const user = { id: uuidv4(), ...data };
    this.collection.push(user);
    return user;
  }
}
