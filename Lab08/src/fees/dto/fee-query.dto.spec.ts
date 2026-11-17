import 'reflect-metadata';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { FeeQueryDto } from './fee-query.dto';

describe('FeeQueryDto', () => {
  it('transforms a valid fee query', async () => {
    const dto = plainToInstance(FeeQueryDto, { credits: '3', cgpa: '3.75', policy: 'merit' });
    expect(await validate(dto)).toHaveLength(0);
    expect(dto.credits).toBe(3);
    expect(dto.cgpa).toBe(3.75);
  });

  it('rejects non-numeric credits', async () => {
    const dto = plainToInstance(FeeQueryDto, { credits: 'three', cgpa: '3.5' });
    expect((await validate(dto)).some((error) => error.property === 'credits')).toBe(true);
  });

  it('rejects credits outside its permitted range', async () => {
    const dto = plainToInstance(FeeQueryDto, { credits: '31', cgpa: '3.5' });
    expect((await validate(dto)).some((error) => error.property === 'credits')).toBe(true);
  });

  it('rejects CGPA outside zero through four', async () => {
    const dto = plainToInstance(FeeQueryDto, { credits: '3', cgpa: '4.1' });
    expect((await validate(dto)).some((error) => error.property === 'cgpa')).toBe(true);
  });

  it('rejects an unsupported fee policy', async () => {
    const dto = plainToInstance(FeeQueryDto, {
      credits: '3', cgpa: '3.5', policy: 'waived',
    });
    expect((await validate(dto)).some((error) => error.property === 'policy')).toBe(true);
  });

  it('requires credits and CGPA', async () => {
    const dto = plainToInstance(FeeQueryDto, {});
    expect((await validate(dto)).map((error) => error.property)).toEqual(
      expect.arrayContaining(['credits', 'cgpa']),
    );
  });
});
