import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  type Relation,
} from 'typeorm';
import { Note } from '../notes/note.entity.js';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 50 })
  name: string;

  @ManyToMany(() => Note, (note) => note.tags)
  notes: Relation<Note[]>;
}
