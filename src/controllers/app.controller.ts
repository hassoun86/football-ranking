import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AppService } from '../services/app.service';
import CreateMatchResultRequestDto from '../dto/create-match-result-request.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getRanking(): string {
    return this.appService.getRanking();
  }

  @Post()
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  createMatchResult(@Body() payload: CreateMatchResultRequestDto) {
    return this.appService.createMatchResult(payload);
  }
}
