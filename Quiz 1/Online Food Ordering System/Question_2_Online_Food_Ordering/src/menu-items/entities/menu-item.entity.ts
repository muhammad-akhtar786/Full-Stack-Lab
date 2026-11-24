import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';

@Entity()
export class MenuItem {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @Column('decimal', { precision: 10, scale: 2 }) price: number;
  @ManyToOne(() => Restaurant, restaurant => restaurant.menuItems, { onDelete: 'CASCADE' }) restaurant: Restaurant;
}
