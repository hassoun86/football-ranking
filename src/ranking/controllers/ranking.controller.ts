import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import CreateMatchResultRequestDto from '../dto/create-match-result-request.dto';
import CreateTeamRequestDto from '../dto/create-team-request.dto';
import { RankingService } from '../services/app.service';

@Controller()
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get('/ranking')
  getRanking(): any {
    return this.rankingService.getRanking();
  }

  @Post('/matchResult')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  createMatchResult(@Body() payload: CreateMatchResultRequestDto) {
    return this.rankingService.createMatchResult(payload);
  }

  @Post('/teams')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  createTeam(@Body() payload: CreateTeamRequestDto) {
    return this.rankingService.createTeam(payload);
  }
}
