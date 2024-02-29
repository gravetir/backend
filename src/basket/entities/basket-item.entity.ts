import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductEntity } from 'src/product/entities/product.entity';
import { UserEntity } from 'src/users/entities/user.entity';
@Entity('basket')
export class BasketItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  count: number;

  @Column({ default: 0 })
  total: number;

  @ManyToOne(() => ProductEntity, (product) => product.basket, {
    eager: true,
  })
  @JoinColumn()
  product: ProductEntity;
  @OneToOne(() => UserEntity, (user) => user.basket, {
    eager: true,
  })
  @JoinColumn()
  user: UserEntity;
  // getTotalPrice() {
  //   let sum = 0;
  //   sum = this.product.price * this.count;
  //   return sum;
  // }
}
