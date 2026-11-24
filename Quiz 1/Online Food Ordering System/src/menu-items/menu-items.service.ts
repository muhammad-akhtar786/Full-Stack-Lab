import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenuItem } from './entities/menu-item.entity';
import { Restaurant } from '../restaurants/entities/restaurant.entity';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';

@Injectable()
export class MenuItemsService {
  constructor(
    @InjectRepository(MenuItem) private readonly items: Repository<MenuItem>,
    @InjectRepository(Restaurant) private readonly restaurants: Repository<Restaurant>
  ) {}
  findAll() { return this.items.find({ relations: { restaurant: true } }); }
  async findOne(id: number) {
    const item = await this.items.findOne({ where: { id }, relations: { restaurant: true } });
    if (!item) throw new NotFoundException('Menu item not found.');
    return item;
  }
  async create(dto: CreateMenuItemDto) {
    const restaurant = await this.restaurants.findOneBy({ id: dto.restaurantId });
    if (!restaurant) throw new NotFoundException('Restaurant not found.');
    return this.items.save(this.items.create({ name: dto.name, price: dto.price, restaurant }));
  }
  async update(id: number, dto: UpdateMenuItemDto) {
    const item = await this.findOne(id);
    if (dto.name !== undefined) item.name = dto.name;
    if (dto.price !== undefined) item.price = dto.price;
    if (dto.restaurantId !== undefined) {
      const restaurant = await this.restaurants.findOneBy({ id: dto.restaurantId });
      if (!restaurant) throw new NotFoundException('Restaurant not found.');
      item.restaurant = restaurant;
    }
    return this.items.save(item);
  }
  async remove(id: number) {
    const item = await this.findOne(id);
    await this.items.remove(item);
    return { message: 'Menu item removed.' };
  }
}
