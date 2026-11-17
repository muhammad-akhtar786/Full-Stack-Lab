import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { createValidationPipe } from '../src/common/pipes/app-validation.pipe';
import { SEED_COURSES } from '../src/courses/courses.seed';
import { COURSE_STORE, InMemoryCourseStore } from '../src/courses/store/course-store';

describe('Courses and Fees API (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(COURSE_STORE)
      .useValue(new InMemoryCourseStore(SEED_COURSES))
      .compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(createValidationPipe());
    await app.init();
  });

  afterEach(() => app.close());

  const validCourse = {
    code: 'AI401',
    title: 'Artificial Intelligence',
    department: 'Computer Science',
    credits: 3,
    instructor: 'Dr. Zara',
    capacity: 24,
  };

  it('lists six seeded courses', async () => {
    const response = await request(app.getHttpServer()).get('/api/courses').expect(200);
    expect(response.body).toHaveLength(6);
  });

  it('returns course statistics', async () => {
    const response = await request(app.getHttpServer()).get('/api/courses/stats').expect(200);
    expect(response.body).toMatchObject({
      totalCourses: 6,
      totalCredits: 17,
      overloaded: false,
    });
  });

  it('filters and transforms course query values', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/courses?department=Computer%20Science&minCredits=3&limit=2')
      .expect(200);
    expect(response.body.map((course) => course.code)).toEqual(['CS101', 'CS202']);
  });

  it('retrieves a course using a lowercase code', async () => {
    const response = await request(app.getHttpServer()).get('/api/courses/cs101').expect(200);
    expect(response.body.code).toBe('CS101');
  });

  it('retrieves the CS-301L course', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/courses/cs-301l')
      .expect(200);
    expect(response.body.code).toBe('CS-301L');
  });

  it('creates a course and normalizes its fields', async () => {
    const response = await request(app.getHttpServer())
      .post('/api/courses')
      .send({ ...validCourse, code: ' ai401 ', title: ' Artificial Intelligence ' })
      .expect(201);
    expect(response.body).toMatchObject({
      code: 'AI401',
      title: 'Artificial Intelligence',
      credits: 3,
    });
  });

  it('rejects duplicate course codes', async () => {
    await request(app.getHttpServer())
      .post('/api/courses')
      .send({ ...validCourse, code: 'CS101' })
      .expect(409);
  });

  it('rejects invalid body fields', async () => {
    await request(app.getHttpServer())
      .post('/api/courses')
      .send({ ...validCourse, credits: 0 })
      .expect(400);
  });

  it('rejects extra properties instead of whitelisting silently', async () => {
    await request(app.getHttpServer())
      .post('/api/courses')
      .send({ ...validCourse, isAdmin: true })
      .expect(400);
  });

  it('rejects malformed route codes', async () => {
    await request(app.getHttpServer()).get('/api/courses/CS-1').expect(400);
  });

  it('rejects invalid query values', async () => {
    await request(app.getHttpServer()).get('/api/courses?minCredits=abc').expect(400);
    await request(app.getHttpServer()).get('/api/courses?sort=instructor').expect(400);
  });

  it('replaces a course using PUT', async () => {
    const response = await request(app.getHttpServer())
      .put('/api/courses/CS101')
      .send({
        title: 'Programming I',
        department: 'Computer Science',
        credits: 4,
        instructor: 'Dr. Ali',
        capacity: 45,
      })
      .expect(200);
    expect(response.body).toMatchObject({ code: 'CS101', title: 'Programming I', credits: 4 });
  });

  it('updates only the supplied course fields using PATCH', async () => {
    const response = await request(app.getHttpServer())
      .patch('/api/courses/CS101')
      .send({ capacity: 50 })
      .expect(200);
    expect(response.body).toMatchObject({
      title: 'Programming Fundamentals',
      capacity: 50,
    });
  });

  it('returns 404 when a course does not exist', async () => {
    await request(app.getHttpServer()).get('/api/courses/CS999').expect(404);
  });

  it('returns fee policy information', async () => {
    const response = await request(app.getHttpServer()).get('/api/fees/info').expect(200);
    expect(response.body).toMatchObject({
      feeRatePerCredit: 5000,
      policies: { merit: { qualifyingCgpa: 3.5, discountPercent: 50 } },
    });
  });

  it('calculates standard and merit fees', async () => {
    const standard = await request(app.getHttpServer())
      .get('/api/fees/calculate?credits=12&cgpa=3.8&policy=standard')
      .expect(200);
    const merit = await request(app.getHttpServer())
      .get('/api/fees/calculate?credits=12&cgpa=3.8&policy=merit')
      .expect(200);
    expect(standard.body.total).toBe(60000);
    expect(merit.body.total).toBe(30000);
  });

  it('rejects invalid fee queries', async () => {
    await request(app.getHttpServer())
      .get('/api/fees/calculate?credits=0&cgpa=5')
      .expect(400);
    await request(app.getHttpServer())
      .get('/api/fees/calculate?credits=3&cgpa=3.5&policy=waived')
      .expect(400);
  });

  it('deletes a course and returns 404 afterwards', async () => {
    await request(app.getHttpServer()).delete('/api/courses/CS101').expect(204);
    await request(app.getHttpServer()).get('/api/courses/CS101').expect(404);
  });
});
