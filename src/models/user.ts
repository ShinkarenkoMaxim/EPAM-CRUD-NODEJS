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
    return this.collection.filter((user) => user.id === id)[0];
  }

  create(data: User): User {
    const user = { id: uuidv4(), ...data };
    this.collection.push(user);
    return user;
  }

  update(id: string, data: User) {
    const { username, age, hobbies } = data;

    // Compare input data and save to existing object
    const collectionKey = this.collection.findIndex((user) => user.id === id);
    const currentUser = this.collection[collectionKey];
    const newUser = Object.assign(currentUser, {
      username,
      age,
      hobbies,
    });

    this.collection[collectionKey] = newUser;

    return newUser;
  }
}
