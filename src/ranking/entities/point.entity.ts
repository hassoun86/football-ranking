import { PrimaryGeneratedColumn, Column, Entity, ManyToOne } from 'typeorm';
import Team from './team.entity';

@Entity({ name: 'points' })
export default class PointEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  numberOfPoints!: number;

  @ManyToOne(() => Team, (team) => team.points)
  team!: Team;
}
