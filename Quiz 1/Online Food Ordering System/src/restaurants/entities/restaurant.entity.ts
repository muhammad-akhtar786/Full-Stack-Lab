import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { MenuItem } from '../../menu-items/entities/menu-item.entity';

@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn() id: number;
  @Column() name: string;
  @OneToMany(() => MenuItem, menuItem => menuItem.restaurant) menuItems: MenuItem[];
}
