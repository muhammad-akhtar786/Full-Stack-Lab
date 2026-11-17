import { Module } from '@nestjs/common';
import { StudentsModule } from '../students/students.module';
import { HonorRollController } from './honor-roll.controller';
import { HonorRollService } from './honor-roll.service';

@Module({
  imports: [StudentsModule],
  controllers: [HonorRollController],
  providers: [HonorRollService],
})
export class HonorRollModule {}