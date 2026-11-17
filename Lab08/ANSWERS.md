# Lab 08 Tasks - Answers

## Task 1: Courses

- `CoursesModule` provides `CoursesService`, `CreditService`, and the
  `COURSE_STORE` Symbol token.
- Its `useFactory` selects `InMemoryCourseStore` when `STORAGE=memory` and
  `JsonFileCourseStore` otherwise. The factory receives `AppConfig` and
  `AppLogger` through its `inject` list.
- The in-memory implementation starts with six entries from `courses.seed.ts`;
  the default JSON file contains the same six records. They total 17 credit
  hours and include the `CS-301L` course code.
- `CoursesService` implements list/filter, statistics, find, create, replace,
  partial update, and delete behavior. It logs successful mutations.
- `CreditService` provides aggregate credit calculations. Statistics report
  `overloaded: true` only when total course credits exceed 18.

## Task 2: Fees

- `FEE_RATE` is a string token, and the configured rate is 5,000 PKR per credit.
- `FEE_POLICY` is a Symbol token aliased with `useExisting` to the
  `STANDARD_FEE_POLICY` provider.
- The standard and merit policy providers are constructed with `useFactory`
  and inject `FEE_RATE`. Merit pricing discounts 50% when CGPA is at least 3.5.
- `GET /api/fees/info` describes the configured rate and policies.
  For 12 credits at CGPA 3.8, standard fees are 60,000 PKR and merit fees are
  30,000 PKR.

## Task 3: DTOs and validation

- `CreateCourseDto` validates and normalizes course bodies.
- `ReplaceCourseDto` requires all replaceable properties while excluding `code`,
  which is selected by the URL.
- `UpdateCourseDto` makes those properties optional for PATCH requests.
- `QueryCourseDto`, `CodeParamDto`, and `FeeQueryDto` validate query strings and
  route parameters and convert numeric strings to numbers.
- The global validation pipe transforms DTO instances, rejects invalid values,
  and rejects unknown properties via `whitelist` and `forbidNonWhitelisted`.

## Task 4: Tests and collection

- Course service, fee policy, and course/fee DTO suites are under `src/`.
- `test/courses.e2e-spec.ts` covers the actual HTTP endpoints and validation.
- The Postman collection has more than 15 requests, including negative
  validation, duplicate, missing-resource, and unsupported-query cases.
- Execute the collection against a freshly started server; the course create,
  duplicate, and delete requests are stateful.
