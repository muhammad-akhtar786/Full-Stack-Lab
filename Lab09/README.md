# CS-301L Lab 09 — Roll No. 242756

NestJS security lab implementation based on the provided Lab 09 Manual and graded task sheet.

## Setup
1. Install Node.js 20+.
2. Open this folder in VS Code or terminal.
3. Run `npm install`.
4. Set a JWT secret (PowerShell): `$env:JWT_SECRET="your-long-random-secret"`
5. Run `npm run start:dev`.

API runs at `http://localhost:3000`. Data is stored in memory and resets after server restart.

Seeded admin:
- Email: `admin@lab.com`
- Password: `Admin@1234`

## Endpoints
- POST `/auth/register`
- POST `/auth/login`
- GET `/auth/profile` (Bearer token)
- POST `/auth/change-password` (Bearer token)
- POST `/notes` (Bearer token)
- GET `/notes?order=asc|desc` (Bearer token)
- GET `/notes/:id` (Bearer token; owner or admin)
- PATCH `/notes/:id` (Bearer token; owner or admin)
- DELETE `/notes/:id` (Bearer token; admin only)
- GET `/users` (Bearer token; admin only)

## Reflection answers

1. **401 vs 403:** 401 means the request has not authenticated, such as calling `GET /notes` without a token. 403 means the user is authenticated but lacks permission, such as a normal user trying to delete a note.
2. **Server-side validation:** Client validation can be bypassed using tools like Postman or curl. The server must validate every request to protect the application.
3. **Readable JWT payload:** The payload is encoded, not encrypted, but the server verifies its signature and expiry. Tampering invalidates the signature; sensitive data must not be placed in it.
4. **Same login error:** Returning the same message for an unknown email and a wrong password prevents attackers from discovering registered email addresses.
5. **Request lifecycle:** Middleware runs first, then guards, then pipes, then the controller. AuthGuard must run before RolesGuard so the authenticated user and their role are attached to the request before authorization is checked.

## Screenshots
Create evidence screenshots from Postman/Thunder Client in `screenshots/` as required by the task sheet. Screenshots are not fabricated or included.
