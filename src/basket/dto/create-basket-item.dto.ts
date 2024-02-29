import { ApiProperty } from '@nestjs/swagger';

export class CreateBasketItemDto {
  @ApiProperty()
  count: number;
  @ApiProperty()
  productId: number;
  @ApiProperty()
  userId: number;
}
