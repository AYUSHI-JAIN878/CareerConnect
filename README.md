# Placement & Job Portal

A complete MERN-style placement and job portal for students, recruiters, and admins.

## Stack

- Frontend: React, Vite, React Router, Axios, JavaScript, CSS
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth: JWT + bcrypt
- Uploads: Multer
- Security: CORS, dotenv, validation, role middleware

## Architecture

```text
client/                  React SPA
  src/
    components/          Reusable UI
    context/             Auth state
    pages/               Route-level screens
    services/            Axios API client
    hooks/
server/
  config/                MongoDB configuration
  controllers/           Request/business logic
  middleware/            Auth, roles, errors, uploads
  models/                Mongoose schemas
  routes/                REST endpoints
  utils/                 JWT and validation helpers
  uploads/resumes/       Uploaded PDF resumes
```

## Database relationships

- `User` stores identity, login credentials, and role.
- `StudentProfile.user` references a User with role `student`.
- `RecruiterProfile.user` references a User with role `recruiter`.
- `Job.recruiter` references a User with role `recruiter`.
- `Application.student` references a User with role `student`.
- `Application.job` references a Job.
- `Application.recruiter` references the recruiter User.
- A compound unique index on `(job, student)` prevents duplicate applications.

## Authentication flow

1. Register or login sends credentials to `/api/auth`.
2. The server hashes passwords with bcrypt.
3. Login returns a signed JWT.
4. The frontend stores the JWT and sends it as `Authorization: Bearer <token>`.
5. `auth` middleware verifies the token and loads the user.
6. `allowRoles()` protects role-specific endpoints.
7. The server never sends the password hash to the frontend.

## Requirements

- Node.js 18+
- MongoDB local server or MongoDB Atlas
- npm

## Setup

### 1. Server

```bash
cd server
npm install
copy .env.example .env
npm run seed
npm run dev
```

On macOS/Linux, use:

```bash
cp .env.example .env
```

Server defaults to `http://localhost:5000`.

### 2. Client

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Frontend defaults to `http://localhost:5173`.

If the server URL changes, update `VITE_API_URL` in `client/.env`.

## Environment variables

### server/.env

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/placement_portal
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

### client/.env

```env
VITE_API_URL=http://localhost:5000/api
```

## Seed accounts

After `npm run seed`:

- Admin: `admin@placement.local` / `Admin@123`
- Recruiter: `recruiter@techcorp.local` / `Recruiter@123`
- Student: `student@college.local` / `Student@123`

Change these credentials before using the application publicly.

## REST API

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Jobs
- `GET /api/jobs`
- `GET /api/jobs/:id`
- `POST /api/jobs` recruiter
- `PUT /api/jobs/:id` recruiter/admin
- `DELETE /api/jobs/:id` recruiter/admin
- `POST /api/jobs/:id/apply` student

### Applications
- `GET /api/applications/my` student
- `GET /api/applications/recruiter` recruiter
- `PUT /api/applications/:id/status` recruiter

### Profiles
- `GET /api/profile`
- `PUT /api/profile`
- `POST /api/profile/resume`

### Admin
- `GET /api/admin/users`
- `GET /api/admin/statistics`

## Example API request

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "student@college.local",
  "password": "Student@123"
}
```

## GitHub

```bash
git init
git add .
git commit -m "Initial placement portal"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Never commit `.env`, uploaded resumes, or secrets.

## Troubleshooting

### MongoDB connection error
Check that MongoDB is running and `MONGO_URI` is correct.

### CORS error
Ensure `CLIENT_URL` matches the Vite URL, usually `http://localhost:5173`.

### 401 Unauthorized
Log out and log back in. The JWT may have expired or the server secret may have changed.

### Resume upload rejected
Only PDF files up to 5 MB are accepted.

### Port already in use
Change `PORT` in `server/.env`, and change `VITE_API_URL` accordingly.

## Production notes

For deployment, serve the React build from a static host and the API from a Node host. Use MongoDB Atlas, HTTPS, a strong JWT secret, a persistent object-storage solution for resumes, rate limiting, and stricter production CORS.
