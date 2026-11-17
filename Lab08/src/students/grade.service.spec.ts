
import { GradeService } from './grade.service';

describe('GradeService', () => {
  let service: GradeService;

  beforeEach(() => {
    service = new GradeService();
  });

  it('should return Excellent for CGPA 3.0 or above', () => {
    expect(service.getStatus(3.0)).toBe('Excellent');
    expect(service.getStatus(3.8)).toBe('Excellent');
  });

  it('should return Good for CGPA 2.5 to below 3.0', () => {
    expect(service.getStatus(2.5)).toBe('Good');
    expect(service.getStatus(2.9)).toBe('Good');
  });

  it('should return Satisfactory for CGPA 2.0 to below 2.5', () => {
    expect(service.getStatus(2.0)).toBe('Satisfactory');
    expect(service.getStatus(2.4)).toBe('Satisfactory');
  });

  it('should return Academic Warning for CGPA below 2.0', () => {
    expect(service.getStatus(1.9)).toBe('Academic Warning');
    expect(service.getStatus(0)).toBe('Academic Warning');
  });
});
