import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from 'src/product/entities/product.entity';
@Entity('basket')
export class BasketItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  count: number;

  @ManyToOne(() => ProductEntity, (product) => product.basket, {
    eager: true,
  })
  @JoinColumn()
  product: ProductEntity;
}
