import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  userModel: any;
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}
  async softDeleteUser(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    user.isDeleted = true;
    return user.save();
  }
  async create(dto: CreateUserDto) {
    const existingUser = await this.findByUsername(dto.username);

    if (existingUser) {
      throw new BadRequestException(
        `Пользователь ${dto.username} уже существует`,
      );
    }

    return this.repository.save(dto);
  }

  async findByUsername(username: string) {
    return this.repository.findOneBy({ username });
  }

  async findById(id: number) {
    return this.repository.findOneBy({ id });
  }
}
