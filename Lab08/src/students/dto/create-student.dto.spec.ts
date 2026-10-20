
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateStudentDto } from './create-student.dto';
import { Department } from '../student.entity';

describe('CreateStudentDto phone validation', () => {
  const studentData = {
    name: 'Ahmed Raza',
    rollNumber: 'BSCS-100',
    email: 'ahmed@example.com',
    department: Department.CS,
    semester: 5,
    cgpa: 3.5,
  };

  it('should accept a valid phone number and remove hyphens', async () => {
    const dto = plainToInstance(CreateStudentDto, {
      ...studentData,
      phone: '0300-1234567',
    });

    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
    expect(dto.phone).toBe('03001234567');
  });

  it('should reject an invalid phone number', async () => {
    const dto = plainToInstance(CreateStudentDto, {
      ...studentData,
      phone: '12345',
    });

    const errors = await validate(dto);

    expect(errors.some(error => error.property === 'phone')).toBe(true);
  });

  it('should allow a student without a phone number', async () => {
    const dto = plainToInstance(CreateStudentDto, studentData);

    const errors = await validate(dto);

    expect(errors).toHaveLength(0);
  });
});
