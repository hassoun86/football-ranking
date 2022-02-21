import { Injectable } from '@nestjs/common';
import CreateMatchResultRequestDto from '../dto/create-match-result-request.dto';

@Injectable()
export class AppService {
  getRanking(): any {
    return [
      { teamId: 1234, totalPoints: 21 },
      { teamId: 2345, totalPoints: 19 },
    ];
  }

  createMatchResult(payload: CreateMatchResultRequestDto) {
    return {
      home: { teamId: 1, goalsScored: 1 },
      away: { teamId: 2, goalsScored: 2 },
    };
  }
}
