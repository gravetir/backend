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

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @IsString()
  title: string = 'Поршневой компрессор REMEZA СБ4/С-24.OLD15';
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @ApiProperty()
  @Type(() => String)
  @IsString()
  driveUnit: string = 'Прямой';
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @ApiProperty()
  @Type(() => String)
  @IsString()
  typeEngine: string = 'Электрический';
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @ApiProperty()
  @Type(() => String)
  @IsString()
  workVoltage: string = '220В';
  @ApiProperty()
  @Type(() => Number)
  price: number;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @ApiProperty()
  @Type(() => String)
  @IsString()
  currency: string = '₽';

  @IsNumberString()
  categoryId: number;
}
