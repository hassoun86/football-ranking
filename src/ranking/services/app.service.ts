import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, QueryRunner, Repository } from 'typeorm';
import CreateMatchResultRequestDto from '../dto/create-match-result-request.dto';
import MatchEntity from '../entities/match.entity';
import CreateTeamRequestDto from '../dto/create-team-request.dto';
import TeamEntity from '../entities/team.entity';
import GoalEntity from '../entities/goal.entity';
import PointEntity from '../entities/point.entity';
import { PointResult } from '../../../config/interfaces';

@Injectable()
export class RankingService {
  private readonly logger = new Logger(RankingService.name);

  constructor(
    @InjectRepository(MatchEntity)
    private matchRepository: Repository<MatchEntity>,
    @InjectRepository(TeamEntity)
    private teamRepository: Repository<TeamEntity>,
    @InjectRepository(GoalEntity)
    private goalRepository: Repository<GoalEntity>,
    @InjectRepository(PointEntity)
    private pointRepository: Repository<PointEntity>,
  ) {}
  async getRanking(): Promise<any> {
    this.logger.log(`Attempting to get ranking result`);

    try {
      const ranking = await this.teamRepository
        .createQueryBuilder('team')
        .leftJoinAndSelect('team.points', 'point')
        .select('SUM(point.numberOfPoints)', 'totalPoints')
        .addSelect('team.id', 'teamId')
        .groupBy('team.id')
        .orderBy('totalPoints', 'DESC')
        .getRawMany();

      this.logger.log(`Successfully got ranking result`);

      return ranking;
    } catch (err) {
      this.logger.error(err);

      throw err;
    }
  }

  async createMatchResult(payload: CreateMatchResultRequestDto) {
    this.logger.log(`Attempting to create new match result`);

    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const matchEntity = this.matchRepository.create();
      const homeTeam = await this.teamRepository.findOneOrFail(
        payload.home.teamId,
      );
      const awayTeam = await this.teamRepository.findOneOrFail(
        payload.away.teamId,
      );

      matchEntity.teams = [homeTeam, awayTeam];
      await queryRunner.manager.save(matchEntity);

      await this.storeMatchGoals(queryRunner, payload, homeTeam, awayTeam);

      await this.storeMatchPoints(queryRunner, payload, homeTeam, awayTeam);

      await queryRunner.commitTransaction();

      this.logger.log(`Successfully created new match result`);
    } catch (error) {
      this.logger.log(`Failed to create new match result error: ${error}`);

      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async storeMatchGoals(
    queryRunner: QueryRunner,
    payload: CreateMatchResultRequestDto,
    homeTeam: TeamEntity,
    awayTeam: TeamEntity,
  ): Promise<void> {
    this.logger.log(`Attempting to store match goals`);

    try {
      const homeGoalEntity = this.goalRepository.create();
      homeGoalEntity.scored = payload.home.goalsScored;
      homeGoalEntity.received = payload.away.goalsScored;
      homeGoalEntity.team = homeTeam;

      await queryRunner.manager.save(homeGoalEntity);

      const awayGoalEntity = this.goalRepository.create();
      awayGoalEntity.scored = payload.away.goalsScored;
      awayGoalEntity.received = payload.home.goalsScored;
      awayGoalEntity.team = awayTeam;

      await queryRunner.manager.save(awayGoalEntity);

      this.logger.log(`Successfully stored match goals`);
    } catch (err) {
      this.logger.error(`Failed to store match goals error: ${err}`);

      throw err;
    }
  }

  async storeMatchPoints(
    queryRunner: QueryRunner,
    payload: CreateMatchResultRequestDto,
    homeTeam: TeamEntity,
    awayTeam: TeamEntity,
  ): Promise<void> {
    this.logger.log(`Attempting to store match points`);

    try {
      const numberOfPoints = this.getNumberOfPoints(
        payload.home.goalsScored,
        payload.away.goalsScored,
      );

      const awayPointEntity = this.pointRepository.create();
      awayPointEntity.numberOfPoints = numberOfPoints.awayPoint;
      awayPointEntity.team = awayTeam;

      await queryRunner.manager.save(awayPointEntity);

      const homePointEntity = this.pointRepository.create();
      homePointEntity.numberOfPoints = numberOfPoints.homePoint;
      homePointEntity.team = homeTeam;

      await queryRunner.manager.save(homePointEntity);

      this.logger.log(`Successfully stored match points`);
    } catch (err) {
      this.logger.error(`Failed to store match points error: ${err}`);

      throw err;
    }
  }

  getNumberOfPoints(homeTeamScore: number, awayTeamScore: number): PointResult {
    const result = { homePoint: 0, awayPoint: 0 };

    if (awayTeamScore > homeTeamScore) {
      result.awayPoint = 3;
    } else if (homeTeamScore > awayTeamScore) {
      result.homePoint = 3;
    } else {
      result.awayPoint = 1;
      result.homePoint = 1;
    }

    return result;
  }

  async createTeam(payload: CreateTeamRequestDto) {
    this.logger.log(`Attempting to create a new Team ${payload.name}`);

    try {
      const teamEntity = this.teamRepository.create(payload);

      const { id } = await this.teamRepository.save(teamEntity);

      this.logger.log(`Successfully created a new Team ${payload.name}`);

      return this.teamRepository.findOneOrFail(id);
    } catch (err) {
      throw err;
    }
  }
}
