import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('promo')
export class PromoEntity {
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
  text: any;
}
