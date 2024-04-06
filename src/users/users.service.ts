import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { BasketService } from 'src/basket/basket.service';
import { Role } from 'src/role/entities/role.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly basketService: BasketService,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.findByUserName(dto.username);

    if (existingUser) {
      throw new BadRequestException(
        `Пользователь ${dto.username} уже существует`,
      );
    }
    const role = await this.roleRepository.findOne({ where: { id: 2 } });
    const user = await this.userRepository.create(dto);
    user.role = role;
    user.username = dto.username;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(dto.password, user.salt);
    const savedUser = await this.userRepository.save(user);
    const basket = await this.basketService.create(savedUser);
    savedUser.basket = basket;
    await this.userRepository.save(savedUser);

    return savedUser;
  }
  async createadmin(): Promise<void> {
    const admin = new UserEntity();
    admin.username = 'admin';
    admin.password = '9854327';
    const role = await this.roleRepository.findOne({
      where: { id: 1 },
      relations: ['users'],
    });

    const user = await this.userRepository.save(admin); // Сохраняем админа

    role.users.push(user);

    await this.roleRepository.save(role);
  }
  async findByUserName(name: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ username: name });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async findById(id: number) {
    return this.userRepository.findOneBy({
      id,
    });
  }

  async remove(req: any): Promise<DeleteResult> {
    await this.basketService.removeBasket(req.user.id);

    return await this.userRepository.delete(req.user.id);
  }
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
