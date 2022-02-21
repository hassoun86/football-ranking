import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RankingController } from './controllers/ranking.controller';
import MatchEntity from './entities/match.entity';
import { RankingService } from './services/app.service';
import TeamEntity from './entities/team.entity';
import PointEntity from './entities/point.entity';
import GoalEntity from './entities/goal.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MatchEntity,
      TeamEntity,
      PointEntity,
      GoalEntity,
    ]),
  ],
  controllers: [RankingController],
  providers: [RankingService],
})
export class RankingModule {}
