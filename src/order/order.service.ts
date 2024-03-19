import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from 'src/order/entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItemEntity } from './entities/order-item.entity';
import { BasketService } from 'src/basket/basket.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { UserService } from 'src/users/users.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderItemEntity)
    private orderitemRepository: Repository<OrderItemEntity>,
    private readonly basketService: BasketService,
    private readonly userService: UserService,
  ) {}
  async order(req: any, dto: CreateOrderDto) {
    //find user existing orders
    console.log(dto);
    const user = await this.userService.findById(req.user.id);
    const userBasket = await this.basketService.getUserBasket(req.user);
    const order = await this.create(user, dto);
    order.orderItems = [];
    order.status = dto.status;
    order.shippingAddress = dto.shippingAddress;

    for (let i = 0; i <= userBasket.BasketItems.length; i++) {
      if (userBasket.BasketItems[i] && userBasket.BasketItems[i].product) {
        const orderItem = this.orderitemRepository.create({
          product: userBasket.BasketItems[i].product,
          order: order,
        });
        orderItem.orderPrice = userBasket.BasketItems[i].basketPrice;
        await this.orderitemRepository.save(orderItem);
        order.orderItems.push(orderItem);
      }
    }
    if (order.orderItems == null) {
      return 0;
    }
    let sum = 0;
    order.orderItems.forEach((a) => (sum += a.orderPrice));
    order.totalPrice = sum;

    user.order = order;
    await this.basketService.removeBasket(req.user.id);
    await this.basketService.create(user);
    // await this.basketService.delete(user.id);
    await this.orderRepository.save(order);
  }

  async getItemsFromBasket(user: any) {
    const items = await this.basketService.findAll(user);
    return items;
  }
  async create(user: UserEntity, dto: CreateOrderDto) {
    const order = new Order();
    order.status = 'В пути';
    order.shippingAddress = dto.shippingAddress;
    order.totalPrice = 0;
    order.user = user;
    await this.orderRepository.save(order);
    return order;
  }
}
