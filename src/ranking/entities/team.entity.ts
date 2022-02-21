import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import Point from './point.entity';
import GoalEntity from './goal.entity';

@Entity({ name: 'teams' })
export default class TeamEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @OneToMany(() => Point, (point) => point.team)
  points: Point[];

  @OneToMany(() => GoalEntity, (goal) => goal.team)
  goals: GoalEntity[];
}
