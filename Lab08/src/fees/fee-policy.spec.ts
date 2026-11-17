import { MeritFeePolicy, StandardFeePolicy } from './fee-policy';

describe('Fee policies', () => {
  const standard = new StandardFeePolicy(5000);
  const merit = new MeritFeePolicy(5000);

  it('calculates the standard rate for one credit', () => {
    expect(standard.quote(1, 4).total).toBe(5000);
  });

  it('calculates the standard rate for multiple credits', () => {
    expect(standard.quote(4, 2).total).toBe(20000);
  });

  it('reports standard policy subtotal and no discount', () => {
    expect(standard.quote(3, 4)).toMatchObject({
      policy: 'standard', subtotal: 15000, discount: 0, total: 15000,
    });
  });

  it('applies a 50 percent merit discount at the qualifying CGPA', () => {
    expect(merit.quote(3, 3.5)).toMatchObject({
      policy: 'merit', subtotal: 15000, discount: 7500, total: 7500,
    });
  });

  it('applies a 50 percent discount above the qualifying CGPA', () => {
    expect(merit.quote(5, 4).total).toBe(12500);
  });

  it('does not apply the merit discount below the threshold', () => {
    expect(merit.quote(3, 3.49)).toMatchObject({ discount: 0, total: 15000 });
  });

  it('rounds the discount and final amount to two decimals', () => {
    const policy = new MeritFeePolicy(4999.99, 3.5, 0.2);
    expect(policy.quote(1, 4)).toMatchObject({ discount: 1000, total: 3999.99 });
  });

  it('calculates the requested standard fee for 12 credits', () => {
    expect(standard.quote(12, 3.8).total).toBe(60000);
  });

  it('calculates the requested merit fee for 12 credits at CGPA 3.8', () => {
    expect(merit.quote(12, 3.8).total).toBe(30000);
  });
});
