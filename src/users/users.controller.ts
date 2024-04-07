import {
  Controller,
  Post,
  Body,
  Request,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete()
  delete(@Request() req: any): Promise<DeleteResult> {
    return this.userService.remove(req);
  }
}
