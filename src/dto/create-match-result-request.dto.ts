import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import MatchResult from './match-result';
export default class CreateMatchResultRequestDto {
  @ApiProperty({
    description: 'The home result',
  })
  @ValidateNested()
  @Type(() => MatchResult)
  home: MatchResult;

  @ApiProperty({
    description: 'The away result',
  })
  @ValidateNested()
  @Type(() => MatchResult)
  away: MatchResult;
}
