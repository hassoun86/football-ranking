import { PrimaryGeneratedColumn, Entity, ManyToMany, JoinTable } from 'typeorm';
import Team from './team.entity';

@Entity({ name: 'matches' })
export default class MatchEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToMany(() => Team)
  @JoinTable()
  teams: Team[];
}
