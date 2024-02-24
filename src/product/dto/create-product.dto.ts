import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNumberString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    type: 'file',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  })
  image: Express.Multer.File;

  @IsString()
  title = 'Поршневой компрессор REMEZA СБ4/С-24.OLD15';
  @ApiProperty()
  @Type(() => String)
  @IsString()
  driveUnit = 'Прямой';
  @ApiProperty()
  @Type(() => String)
  @IsString()
  typeEngine = 'Электрический';
  @ApiProperty()
  @Type(() => String)
  @IsString()
  workVoltage = '220В';
  @ApiProperty()
  @Type(() => String)
  price: string;
  @ApiProperty()
  @Type(() => String)
  @IsString()
  currency = '₽';

  @IsNumberString()
  categoryId: number;
}
