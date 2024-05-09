import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private repository: Repository<CategoryEntity>,
  ) {}

  async create(
    dto: CreateCategoryDto,
    image: Express.Multer.File,
  ): Promise<CategoryEntity> {
    const category = new CategoryEntity();
    category.image = image.filename;
    category.name = dto.name;
    category.description = dto.description;
    const newProduct = await this.repository.save(category);
    return newProduct;
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(
    id: number,
    dto: UpdateCategoryDto,
    image: Express.Multer.File,
  ): Promise<CategoryEntity> {
    const toUpdate = await this.repository.findOneBy({ id });
    if (!toUpdate) {
      throw new BadRequestException(`Запись с id=${id} не найдена`);
    }

    if (dto.name) toUpdate.name = dto.name;
    if (dto.description) toUpdate.description = dto.description;

    if (image) {
      if (toUpdate.image !== image.filename) {
        fs.unlink(`db_images/product/${toUpdate.image}`, (err) => {
          if (err) {
            console.error(err);
          }
        });
        toUpdate.image = image.filename;
      }
    }

    return this.repository.save(toUpdate);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}
