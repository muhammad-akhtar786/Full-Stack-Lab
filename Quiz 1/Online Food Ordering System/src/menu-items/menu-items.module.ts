import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItem } from './entities/menu-item.entity';
import { Restaurant } from '../restaurants/entities/restaurant.entity';
import { MenuItemsController } from './menu-items.controller';
import { MenuItemsService } from './menu-items.service';
import { RequestLoggerMiddleware } from '../common/middleware/request-logger.middleware';

@Module({ imports: [TypeOrmModule.forFeature([MenuItem, Restaurant])], controllers: [MenuItemsController], providers: [MenuItemsService] })
export class MenuItemsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes({ path: 'menu-items', method: RequestMethod.ALL }, { path: 'menu-items/(.*)', method: RequestMethod.ALL });
  }
}
