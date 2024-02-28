import { ApiHideProperty } from '@nestjs/swagger';
import { BasketItemEntity } from 'src/basket/entities/basket-item.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
  @ApiHideProperty()
  @OneToOne(() => BasketItemEntity, (basket) => basket.user)
  basket: BasketItemEntity[];
}
