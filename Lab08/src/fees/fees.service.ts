import { Inject, Injectable } from '@nestjs/common';
import { FeeQueryDto } from './dto/fee-query.dto';
import {
  FeePolicy, MeritFeePolicy, StandardFeePolicy,
} from './fee-policy';
import { FEE_POLICY, MERIT_FEE_POLICY, FEE_RATE } from './fees.tokens';

@Injectable()
export class FeesService {
  constructor(
    @Inject(FEE_POLICY) private readonly standardPolicy: StandardFeePolicy,
    @Inject(MERIT_FEE_POLICY) private readonly meritPolicy: MeritFeePolicy,
    @Inject(FEE_RATE) private readonly feeRate: number,
  ) {}

  info() {
    return {
      feeRatePerCredit: this.feeRate,
      currency: 'PKR',
      policies: {
        standard: { discount: 0 },
        merit: { qualifyingCgpa: 3.5, discountPercent: 50 },
      },
      calculationEndpoint: '/api/fees/calculate',
    };
  }

  calculate(query: FeeQueryDto) {
    const policy: FeePolicy = query.policy === 'merit'
      ? this.meritPolicy
      : this.standardPolicy;
    return policy.quote(query.credits, query.cgpa);
  }
}
