import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export default class MatchResult {
  @IsInt()
  @ApiProperty({
    description: 'The team id',
  })
  teamId: number;

  @ApiProperty({
    description: 'Total scored goals',
  })
  @IsInt()
  goalsScored: number;
}
