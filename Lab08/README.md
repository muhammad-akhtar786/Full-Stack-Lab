# Lab 08 - NestJS Dependency Injection and DTO Validation

This workspace contains the existing Student API and the Lab 08 Courses and Fees APIs.

## Setup and run

```powershell
npm install
npm run start:dev
```

The API listens on `http://localhost:3000`. By default, the JSON file stores are
used. In PowerShell, use `$env:STORAGE="memory"; npm run start:dev` to use the
seeded in-memory stores. Set `$env:PORT="3001"` to change the port.

## APIs

| Resource | Endpoints |
|---|---|
| Courses | `GET /api/courses`, `GET /api/courses/stats`, `GET /api/courses/:code` |
| Courses CRUD | `POST /api/courses`, `PUT /api/courses/:code`, `PATCH /api/courses/:code`, `DELETE /api/courses/:code` |
| Fees | `GET /api/fees/info`, `GET /api/fees/calculate?credits=3&cgpa=3.7&policy=merit` |
| Students | Existing endpoints under `/api/students` |

Course list queries support `search`, `department`, `minCredits`, `maxCredits`,
`sort` (`code`, `title`, `credits`), `order` (`asc`, `desc`), and `limit`.
The six seeded courses total 17 credit hours. Statistics mark the load as
overloaded only when total credits exceed 18. The `CS-301L` course code is
supported. Fee rates are PKR 5,000 per credit. Merit policy applies a 50%
discount when CGPA is 3.5 or higher.

## Tests and build

```powershell
npm.cmd test -- --runInBand
npm.cmd run test -- --runInBand
npm.cmd run test:e2e -- --runInBand
npm.cmd run build
```

The first two commands run unit and DTO tests; the third starts the app in
Nest's test harness with in-memory course storage and exercises HTTP routes.

## Postman

Import [`postman/Lab08_Tasks.postman_collection.json`](./postman/Lab08_Tasks.postman_collection.json)
and run the collection against a freshly started API. Requests cover Courses
CRUD, statistics, validation failures, and both fee policies. The create request
uses `AI401`; use the collection against a fresh in-memory app so the duplicate
and deletion checks start from a known state.

## Implementation map

| Requirement | Implementation |
|---|---|
| Courses storage and provider factory | `src/courses/store/course-store.ts`, `src/courses/courses.module.ts` |
| Courses CRUD, statistics, logging | `src/courses/courses.service.ts`, `src/courses/courses.controller.ts` |
| Course and query DTO validation | `src/courses/dto/` |
| Fee policies and DI tokens | `src/fees/fee-policy.ts`, `src/fees/fees.module.ts` |
| Fee API | `src/fees/fees.controller.ts`, `src/fees/fees.service.ts` |
| Global whitelist validation | `src/common/pipes/app-validation.pipe.ts`, `src/main.ts` |
| E2E coverage | `test/courses.e2e-spec.ts` |

See [ANSWERS.md](./ANSWERS.md) for the dependency-injection explanations and
[RESULTS.md](./RESULTS.md) for the assignment verification record.
