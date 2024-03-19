import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { BasketService } from 'src/basket/basket.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly basketService: BasketService,
  ) {}

  async create(dto: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.findByUserName(dto.username);

    if (existingUser) {
      throw new BadRequestException(
        `Пользователь с именем: ${dto.username} уже существует`,
      );
    }

    const user = await this.userRepository.save(dto); // Сохраняем пользователя

    // Создаем корзину после регистрации
    const basket = await this.basketService.create(user);
    user.basket = basket;

    await this.userRepository.save(user); // Обновляем пользователя с корзиной

    return user;
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
}
