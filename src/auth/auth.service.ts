import {
  ForbiddenException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserEntity } from '../users/entities/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUserName(username);
    const salt = user.salt;
    const passwordhash = await this.hashPassword(password, salt);
    if (user && user.password === passwordhash) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async register(dto: CreateUserDto) {
    const isCreateUsers = this.configService.get('CREATE_USERS') === 'true';
    if (!isCreateUsers) {
      throw new BadRequestException('Запрещено создавать новых пользователей');
    }
    try {
      const userData = await this.usersService.create(dto);

      token: this.jwtService.sign({
        id: userData.id,
        role: userData.role.name,
      });
    } catch (err) {
      // throw new ForbiddenException('Ошибка при регистрации');
      throw new ForbiddenException(err.message);
    }
  }

  async login(user: UserEntity) {
    return {
      token: this.jwtService.sign({ id: user.id, role: user.role.name }),
    };
  }
}
