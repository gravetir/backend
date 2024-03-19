import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from 'src/product/entities/product.entity';
import { Basket } from './basket.entity';
import { OrderItemEntity } from 'src/order/entities/order-item.entity';
import { ApiHideProperty } from '@nestjs/swagger';

@Entity()
export class BasketItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Count: number;

  @Column()
  basketPrice: number;

  // @ApiHideProperty()
  // @OneToMany(() => OrderItemEntity, (orderItems) => orderItems.basket)
  // orderItems: OrderItemEntity[];

  @ManyToOne(() => ProductEntity, (product) => product.basket)
  @JoinColumn()
  product: ProductEntity;

  @ManyToOne(() => Basket, (basket) => basket.BasketItems)
  basket: Basket;
}
