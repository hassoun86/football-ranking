import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import Team from './team.entity';

@Entity({ name: 'goals' })
export default class GoalEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  received: number;

  @Column()
  scored: number;

  @ManyToOne(() => Team, (team) => team.goals)
  team!: Team;
}
