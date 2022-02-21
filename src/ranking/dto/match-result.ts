import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export default class MatchResult {
  @IsInt()
  @ApiProperty({
    description: 'The team id',
    example: 1,
  })
  teamId: number;

  @ApiProperty({
    description: 'Total scored goals',
    example: 3,
  })
  @IsInt()
  goalsScored: number;
}
