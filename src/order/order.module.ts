import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderItemEntity } from './entities/order-item.entity';
import { UsersModule } from 'src/users/users.module';
import { BasketModule } from 'src/basket/basket.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItemEntity]),
    UsersModule,
    BasketModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
