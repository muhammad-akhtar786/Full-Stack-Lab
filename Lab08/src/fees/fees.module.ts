import { Module } from '@nestjs/common';
import { FeesController } from './fees.controller';
import { FeesService } from './fees.service';
import { MeritFeePolicy, StandardFeePolicy } from './fee-policy';
import {
  FEE_POLICY, FEE_RATE, MERIT_FEE_POLICY, STANDARD_FEE_POLICY,
} from './fees.tokens';

@Module({
  controllers: [FeesController],
  providers: [
    { provide: FEE_RATE, useValue: 5000 },
    {
      provide: STANDARD_FEE_POLICY,
      useFactory: (rate: number) => new StandardFeePolicy(rate),
      inject: [FEE_RATE],
    },
    {
      provide: MERIT_FEE_POLICY,
      useFactory: (rate: number) => new MeritFeePolicy(rate),
      inject: [FEE_RATE],
    },
    { provide: FEE_POLICY, useExisting: STANDARD_FEE_POLICY },
    FeesService,
  ],
  exports: [FeesService],
})
export class FeesModule {}
