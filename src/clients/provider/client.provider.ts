import { Client } from '../entities/client.entity';
export const ClientProvider = [
  {
    provide: 'ClientRepository',
    useValue: Client,
  },
];
