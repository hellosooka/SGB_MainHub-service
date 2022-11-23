import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { RolesController } from './roles.controller';
import { Role } from './roles.model';
import { RolesService } from './roles.service';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [SequelizeModule.forFeature([Role, User])],
  exports: [RolesService],
})
export class RolesModule { }
