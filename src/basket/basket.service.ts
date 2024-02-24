import { BadRequestException, Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateBasketItemDto } from './dto/create-basket-item.dto';
import { UpdateBasketItemDto } from './dto/update-basket-item.dto';
import { BasketItemEntity } from './entities/basket-item.entity';
import { ProductEntity } from 'src/product/entities/product.entity';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(BasketItemEntity)
    private basketRepository: Repository<BasketItemEntity>,

    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async create(dto: CreateBasketItemDto): Promise<BasketItemEntity> {
    const basket = new BasketItemEntity();
    basket.count = dto.count;

    const newBasket = await this.basketRepository.save(basket);

    const product = await this.productRepository.findOne({
      where: { id: dto.productId },
      relations: ['basket'],
    });

    product.basket.push(basket);

    await this.productRepository.save(product);

    return newBasket;
  }

  async findAll(): Promise<BasketItemEntity[]> {
    return this.basketRepository.find();
  }

  async findOne(id: number): Promise<BasketItemEntity> {
    return this.basketRepository.findOneBy({ id });
  }

  async findByCategoryId(productId: number): Promise<BasketItemEntity[]> {
    return this.basketRepository
      .createQueryBuilder('basket')
      .leftJoinAndSelect('basket.product', 'product')
      .where('basket.productId = :productId', { productId })
      .getMany();
  }

  async update(
    id: number,
    dto: UpdateBasketItemDto,
  ): Promise<BasketItemEntity> {
    const toUpdate = await this.basketRepository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Товара с id=${id} не найдено`);
    }
    if (dto.count) toUpdate.count = dto.count;
    if (dto.productId) {
      const product = await this.productRepository.findOne({
        where: { id: dto.productId },
        relations: ['basket'],
      });
      toUpdate.product = product;
    }

    return this.basketRepository.save(toUpdate);
  }

  async delete(id: number): Promise<DeleteResult> {
    return this.basketRepository.delete(id);
  }
}
