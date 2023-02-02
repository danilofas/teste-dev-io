import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { Client } from './entities/client.entity';

@Module({
  imports: [SequelizeModule.forFeature([Client])],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
