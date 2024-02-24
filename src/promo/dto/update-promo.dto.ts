import { PartialType } from '@nestjs/swagger';

import { CreatePromoDto } from './create-promo.dto';

export class UpdatePromoDto extends PartialType(CreatePromoDto) {
  price: number;
  title: string;
  currency: string;
  driveUnit: string;
  typeEngine: string;
  workVoltage: string;
}
