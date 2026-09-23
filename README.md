# Secure Task API

A RESTful task management API built with Node.js, Express, Supabase, and PostgreSQL.

This project is being developed as a practical portfolio project to demonstrate backend development, REST API design, database integration, input validation, error handling, authentication, and application security practices.

## Current Features

- REST API built with Express
- PostgreSQL database through Supabase
- Supabase Auth registration and login
- JWT authentication for protected task routes
- Request-scoped Supabase client that carries the authenticated user's JWT
- Row Level Security (RLS) enabled in Supabase
- Task ownership tracked through `user_id`
- Authenticated task creation
- Task retrieval and existing task CRUD endpoints
- Input validation with `express-validator`
- HTTP status codes for validation errors and missing resources
- Centralized error handling
- Environment variables for configuration
- Git/GitHub version control

Authorization is still being completed and verified for user-specific task reads, updates, and deletes. See the roadmap below.

## Tech Stack

- Node.js
- Express.js
- Supabase Auth
- PostgreSQL
- JavaScript
- `express-validator`
- Git/GitHub

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Get tasks |
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks/:id` | Get a task by ID |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

Task routes require authentication. User-specific authorization for GET, PUT, and DELETE is still in progress and must be verified before those operations are considered complete.

### Create a Task

`POST /api/tasks`

Example request:

```json
{
  "title": "Learn API security",
  "description": "Practice secure REST API development"
}
```

Task creation requires an authenticated user. The task is associated with that user through `user_id`.

### Get All Tasks

`GET /api/tasks`

Returns tasks from the database. User-specific filtering and authorization are still being verified.

### Get a Single Task

`GET /api/tasks/:id`

Example:

```text
GET /api/tasks/3
```

If the task does not exist, the API returns:

```json
{
  "error": "Task not found"
}
```

Ownership checks for retrieving a task are still in progress.

## Authentication

Users can register and log in with Supabase Auth. Authenticated requests provide a JWT, which the API uses to create a request-scoped Supabase client. This allows database operations to run in the context of the requesting user and work with Supabase RLS policies.

Protecting tokens remains an important deployment and client-application responsibility. Never log tokens or include them in URLs, and use HTTPS in production.

## Input Validation

Task creation validates incoming data before it reaches the database.

Current validation includes:

- Title is required
- Title must be a string
- Title maximum length is 100 characters
- Description must be a string when provided
- Description maximum length is 500 characters

Invalid input returns HTTP `400 Bad Request`.

## Database Security

The project uses Supabase with PostgreSQL and has Row Level Security (RLS) enabled on the `tasks` table.

Task ownership is recorded in `user_id`, and authenticated task creation is implemented. User-specific authorization for reading, updating, and deleting tasks is still being completed and tested. RLS policies and application-level checks must be verified together to ensure users can only access their own tasks.

Do not use public development policies in a production environment.

## Project Structure

```text
secure-task-api/
├── src/
│   ├── controllers/
│   │   └── taskController.js
│   ├── middleware/
│   │   └── taskValidation.js
│   ├── routes/
│   │   └── tasks.js
│   ├── services/
│   │   └── taskService.js
│   ├── db/
│   │   └── supabase.js
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd secure-task-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file based on `.env.example`.

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Never commit the `.env` file or expose credentials publicly. Do not put Supabase secret or service-role keys in client-side code.

### 4. Start the server

```bash
npm start
```

The API will run at:

```text
http://localhost:3000
```

## Example Requests

The protected task routes require a valid Supabase access token. Supply it as a bearer token when making authenticated requests.

Create a task:

```powershell
$headers = @{ Authorization = "Bearer <access-token>" }
Invoke-RestMethod -Uri "http://localhost:3000/api/tasks" -Method Post -Headers $headers -ContentType "application/json" -Body '{"title":"Learn API security","description":"Practice secure REST API development"}'
```

Retrieve tasks:

```powershell
$headers = @{ Authorization = "Bearer <access-token>" }
Invoke-RestMethod -Uri "http://localhost:3000/api/tasks" -Headers $headers
```

Retrieve a task by ID:

```powershell
$headers = @{ Authorization = "Bearer <access-token>" }
Invoke-RestMethod -Uri "http://localhost:3000/api/tasks/3" -Headers $headers
```

## Security Development Roadmap

Work in progress or planned:

- Complete and verify user-specific authorization for GET, PUT, and DELETE task operations
- Add automated API tests
- Perform deeper security testing, including ownership and IDOR checks
- Add rate limiting
- Add security headers
- Publish API documentation
- Prepare and verify production deployment

## Learning Goals

This project is being developed to build practical experience with:

- REST API development
- Backend architecture
- PostgreSQL databases
- Authentication and authorization
- Input validation
- Access control
- Row Level Security
- API testing
- Secure coding practices
- Git/GitHub workflows

\- OWASP-style web application security concepts

