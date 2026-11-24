import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';

@Injectable()
export class RestaurantsService {
  constructor(@InjectRepository(Restaurant) private readonly repository: Repository<Restaurant>) {}
  findAll() { return this.repository.find({ relations: { menuItems: true } }); }
  create(dto: CreateRestaurantDto) { return this.repository.save(this.repository.create(dto)); }
}
