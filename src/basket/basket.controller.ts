import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BasketService } from './basket.service';
import { CreateBasketItemDto } from './dto/create-basket-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateBasketItemDto } from './dto/update-basket-item.dto';
import { DeleteResult } from 'typeorm';

@ApiTags('basket')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('basket')
export class BasketController {
  constructor(private readonly BaketService: BasketService) {}

  @Post()
  async CreateBasketItemDto(
    @Body() dto: CreateBasketItemDto,
    @Request() req: any,
  ) {
    return await this.BaketService.CreateBasketItemDto(dto, req.user);
  }

  @Get()
  get(@Request() req: any) {
    return this.BaketService.get(req.user.id);
  }

  @Get('all')
  findAll(@Request() req: any) {
    return this.BaketService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: any) {
    return this.BaketService.findOne(+id, req.user);
  }

  @Patch()
  async update(@Body() dto: UpdateBasketItemDto, @Request() req: any) {
    return await this.BaketService.update(dto, req.user);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Request() req: any): Promise<DeleteResult> {
    return this.BaketService.remove(+id, req.user);
  }
}
