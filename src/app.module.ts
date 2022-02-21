import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { RankingModule } from './ranking/ranking.module';

@Module({
  imports: [TypeOrmModule.forRoot(), RankingModule],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
