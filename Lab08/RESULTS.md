# Lab 08 Tasks - Verification Results

Verification was run from the project root.

```powershell
npm.cmd test -- --runInBand
npm.cmd run test -- --runInBand
npm.cmd run test:e2e -- --runInBand
npm.cmd run build
```

| Command/check | Result |
|---|---|
| `npm.cmd test -- --runInBand` | PASS - 7 suites, 53 tests |
| `npm.cmd run test -- --runInBand` | PASS - 7 suites, 53 tests |
| `npm.cmd run test:e2e -- --runInBand` | PASS - 2 suites, 28 tests (18 Courses/Fees and 10 existing Students) |
| `npm.cmd run build` | PASS |
| Direct HTTP smoke test | PASS - `GET /api/courses/stats` returned `totalCourses: 6`, `totalCredits: 17`, `overloaded: false`; fee rate 5,000 PKR/credit; 12 credits at CGPA 3.8 returned standard 60,000 PKR and merit 30,000 PKR |
| JSON file-store check | PASS - all six records total 17 credits and include `CS-301L` |
| Postman collection structure | PASS - valid JSON; 22 requests, 10 negative cases, valid raw bodies and expected-status mappings |

The first unit-test run found metadata/signature errors; both were fixed before
the passing reruns above.

## Requirement checklist

| Assignment requirement | Status | Evidence |
|---|---|---|
| Task 1 - Courses module/service/controller, store Symbol/factory, CreditService, six seeds, CRUD, stats, logging, answers | COMPLETED | `src/courses/`, `data/courses.json`, `ANSWERS.md`; service tests and direct API check pass |
| Task 2 - Fees module/service, standard/merit policies, `FEE_POLICY`, `FEE_RATE`, factories, alias, info and calculation routes | COMPLETED | `src/fees/`; fee policy tests and E2E endpoints pass |
| Task 3 - All six requested DTOs, validation/transforms, PUT/PATCH, whitelist rejection, results record | COMPLETED | `src/courses/dto/`, `src/fees/dto/`, `test/courses.e2e-spec.ts`, this file |
| Task 4 - Course service tests (minimum 6) | COMPLETED | 12 tests in `src/courses/courses.service.spec.ts` |
| Task 4 - Fee policy tests (minimum 6) | COMPLETED | 9 tests in `src/fees/fee-policy.spec.ts` |
| Task 4 - Course DTO tests (minimum 6) | COMPLETED | 11 tests in `src/courses/dto/course-dto.spec.ts` |
| Task 4 - Courses E2E tests (minimum 6) | COMPLETED | 18 Courses/Fees tests in `test/courses.e2e-spec.ts` |
| Task 4 - Postman collection (minimum 15 requests, including 8 negative) | COMPLETED | 22 requests, 10 negative cases, expected-status and changed-requirement assertions; manually executing Runner remains outstanding |
| README, ANSWERS.md, RESULTS.md | COMPLETED | Present and updated |

## Manual checks

- **NOT VERIFIED:** Import and run `postman/Lab08_Tasks.postman_collection.json`
  in Postman Collection Runner against a fresh server started with in-memory
  storage. The collection was parsed and counted, but the Postman GUI Runner was
  not executed.
- **NOT VERIFIED:** Capture and submit screenshots required by the course
  rubric. No screenshot files were present in `screenshots/`, and automated
  tests do not produce submission screenshots. The assignment prompt does not
  specify which screenshot views are required; capture the relevant API
  responses and Runner results according to your rubric.
