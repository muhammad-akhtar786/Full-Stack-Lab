import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly service: RestaurantsService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Post() create(@Body() dto: CreateRestaurantDto) { return this.service.create(dto); }
}
