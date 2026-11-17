import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
  type Relation,
} from 'typeorm';
import { Profile } from '../profiles/profile.entity.js';
import { Note } from '../notes/note.entity.js';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true })
  profile: Relation<Profile>;

  @OneToMany(() => Note, (note) => note.user)
  notes: Relation<Note[]>;
}
