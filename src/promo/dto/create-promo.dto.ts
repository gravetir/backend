import { ApiProperty } from '@nestjs/swagger';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Type } from 'class-transformer';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePromoDto {
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

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title = 'Поршневой компрессор REMEZA СБ4/С-24.OLD15';

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  driveUnit = 'Прямой';

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  typeEngine = 'Электрический';

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  workVoltage = 'Прямой';

  @IsString()
  currency = '₽';
  text: any;
}
