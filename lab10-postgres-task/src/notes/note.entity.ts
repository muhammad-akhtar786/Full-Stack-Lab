import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
  type Relation,
} from 'typeorm';
import { User } from '../users/user.entity.js';
import { Category } from '../categories/category.entity.js';
import { Tag } from '../tags/tag.entity.js';

@Entity('notes')
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ default: false })
  isPinned: boolean;

  @Column({ default: 0 })
  views: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.notes, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' })
  user: Relation<User> | null;

  @ManyToOne(() => Category, (category) => category.notes, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'categoryId' })
  category: Relation<Category> | null;

  @ManyToMany(() => Tag, (tag) => tag.notes, { cascade: true })
  @JoinTable({
    name: 'note_tags',
    joinColumn: { name: 'noteId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
  })
  tags: Relation<Tag[]>;
}
