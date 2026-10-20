
import { Controller, Get } from '@nestjs/common';
import { HonorRollService } from './honor-roll.service';

@Controller('api/honor-roll')
export class HonorRollController {
  constructor(private readonly honorRollService: HonorRollService) {}

  @Get()
  getHonorRoll() {
    return this.honorRollService.getHonorRoll();
  }
}
