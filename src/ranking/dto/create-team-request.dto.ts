import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class CreateTeamRequestDto {
  @ApiProperty({
    description: 'The team name',
  })
  @IsString()
  name: string;
}
