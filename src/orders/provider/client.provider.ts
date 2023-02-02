import { Client } from './../../clients/entities/client.entity';
export const ClientProvider = [
  {
    provide: 'ClientRepository',
    useValue: Client,
  },
];
