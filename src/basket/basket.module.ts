import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { BasketItemEntity } from './entities/basket-item.entity';
import { ProductModule } from 'src/product/product.module';
import { ProductEntity } from 'src/product/entities/product.entity';
@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([BasketItemEntity, ProductEntity]),
    ProductModule,
  ],
  controllers: [BasketController],
  providers: [BasketService],
})
export class BasketModule {}
