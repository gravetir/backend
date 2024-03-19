import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString, isNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  status: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  shippingAddress: string;
}
