import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CategoryEntity } from 'src/category/entities/category.entity';
import { ApiHideProperty } from '@nestjs/swagger';
import { BasketItemEntity } from 'src/basket/entities/basket-item.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  image: string;

  @Column()
  title: string;

  @Column()
  driveUnit: string;

  @Column()
  typeEngine: string;

  @Column()
  workVoltage: string;

  @Column()
  price: number;

  @Column()
  currency: string;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    eager: true,
  })
  @JoinColumn()
  category: CategoryEntity;

  @ApiHideProperty()
  @OneToMany(() => BasketItemEntity, (basket) => basket.product)
  basket: BasketItemEntity[];
}
