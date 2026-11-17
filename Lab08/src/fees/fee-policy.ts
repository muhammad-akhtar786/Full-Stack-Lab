export interface FeeQuote {
  policy: 'standard' | 'merit';
  credits: number;
  ratePerCredit: number;
  subtotal: number;
  discount: number;
  total: number;
}

export interface FeePolicy {
  readonly name: FeeQuote['policy'];
  quote(credits: number, cgpa: number): FeeQuote;
}

export class StandardFeePolicy implements FeePolicy {
  readonly name = 'standard' as const;

  constructor(private readonly feeRate: number) {}

  quote(credits: number, _cgpa: number): FeeQuote {
    const subtotal = credits * this.feeRate;
    return {
      policy: this.name,
      credits,
      ratePerCredit: this.feeRate,
      subtotal,
      discount: 0,
      total: subtotal,
    };
  }
}

export class MeritFeePolicy implements FeePolicy {
  readonly name = 'merit' as const;

  constructor(
    private readonly feeRate: number,
    private readonly qualifyingCgpa = 3.5,
    private readonly discountRate = 0.5,
  ) {}

  quote(credits: number, cgpa: number): FeeQuote {
    const subtotal = credits * this.feeRate;
    const discount = cgpa >= this.qualifyingCgpa
      ? Number((subtotal * this.discountRate).toFixed(2))
      : 0;
    return {
      policy: this.name,
      credits,
      ratePerCredit: this.feeRate,
      subtotal,
      discount,
      total: Number((subtotal - discount).toFixed(2)),
    };
  }
}
