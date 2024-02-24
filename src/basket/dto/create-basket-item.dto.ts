import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNumberString } from 'class-validator';

export class CreateBasketItemDto {
  @ApiProperty()
  count: number;
  @ApiProperty()
  productId: number;
}
