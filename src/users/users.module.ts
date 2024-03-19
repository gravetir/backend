import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from 'src/users/users.service';
import { UserController } from './users.controller';
import { UserEntity } from './entities/user.entity';
import { BasketModule } from 'src/basket/basket.module';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([UserEntity]), BasketModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
