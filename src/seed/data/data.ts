import * as bcrypt from 'bcrypt';

interface SeedUser {
  name: string;
  email: string;
  password: string;
  rol: string[];
}

interface SeedService {
  name: string;
  description: string;
  cost: number;
  category: string;
}

interface SeedData {
  users: SeedUser[];
  services: SeedService[];
}

export const initialData: SeedData = {
  users: [
    {
      email: 'test1@google.com',
      name: 'Test One',
      password: bcrypt.hashSync('#Abc123', 10),
      rol: ['admin'],
    },
    {
      email: 'test2@google.com',
      name: 'Test Two',
      password: bcrypt.hashSync('#Abc123', 10),
      rol: ['user'],
    },
    {
      email: 'test3@google.com',
      name: 'Test Three',
      password: bcrypt.hashSync('#Abc123', 10),
      rol: ['user', 'admin'],
    },
    {
      email: 'test4@google.com',
      name: 'Test Four',
      password: bcrypt.hashSync('#Abc123', 10),
      rol: ['user'],
    },
  ],

  services: [
    {
      name: 'service 1',
      description: 'a description for service 1',
      category: 'Hogar',
      cost: 100.0,
    },
    {
      name: 'service 2',
      description: 'a description for service 2',
      category: 'Tecnología',
      cost: 200.0,
    },
    {
      name: 'service 3',
      description: 'a description for service 3',
      category: 'Salud',
      cost: 300.0,
    },
    {
      name: 'service 4',
      description: 'a description for service 4',
      category: 'Hogar',
      cost: 400.0,
    },
    {
      name: 'service 5',
      description: 'a description for service 5',
      category: 'Tecnología',
      cost: 500.0,
    },
    {
      name: 'service 6',
      description: 'a description for service 6',
      category: 'Salud',
      cost: 600.0,
    },
  ],
};
