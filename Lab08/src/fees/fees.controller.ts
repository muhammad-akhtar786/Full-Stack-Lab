import { Controller, Get, Query } from '@nestjs/common';
import { FeeQueryDto } from './dto/fee-query.dto';
import { FeesService } from './fees.service';

@Controller('api/fees')
export class FeesController {
  constructor(private readonly feesService: FeesService) {}

  @Get('info')
  info() {
    return this.feesService.info();
  }

  @Get('calculate')
  calculate(@Query() query: FeeQueryDto) {
    return this.feesService.calculate(query);
  }
}
