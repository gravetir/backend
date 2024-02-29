import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

import { CreateBasketItemDto } from './dto/create-basket-item.dto';
import { UpdateBasketItemDto } from './dto/update-basket-item.dto';
import { BasketItemEntity } from './entities/basket-item.entity';
import { BasketService } from './basket.service';

@ApiTags('basket')
@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) {}

  @Post()
  async create(@Body() dto: CreateBasketItemDto): Promise<BasketItemEntity> {
    return await this.basketService.create(dto);
  }

  @Get()
  @ApiQuery({ name: 'productId', required: false })
  findAll(@Query('productId') productId: number): Promise<BasketItemEntity[]> {
    if (productId) return this.basketService.findByCategoryId(productId);
    else return this.basketService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string): Promise<BasketItemEntity> {
    return this.basketService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateBasketItemDto,
  ): Promise<BasketItemEntity> {
    return this.basketService.update(+id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<DeleteResult> {
    return this.basketService.delete(+id);
  }
}
