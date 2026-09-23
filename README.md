Secure Task API
A RESTful task management API built with Node.js, Express, Supabase, and PostgreSQL.
This project is being developed as a practical portfolio project to demonstrate backend development, REST API design, database integration, input validation, error handling, authentication, and application security practices.
Current Features
- REST API built with Express
- PostgreSQL database through Supabase
- Supabase Auth registration and login
- JWT authentication for protected task routes
- Request-scoped Supabase client carrying the authenticated user's JWT
- Row Level Security (RLS) enabled in Supabase, with policies verified
- Task ownership tracked through user_id
- Authenticated task creation
- Create, retrieve, update, and delete task endpoints
- Input validation with express-validator
- HTTP status codes for validation errors and missing resources
- Centralized error handling
- Environment variables for configuration
- Git/GitHub version control
User-specific authorization for task retrieval, updates, and deletes remains in progress.
Tech Stack
- Node.js
- Express.js
- Supabase Auth
- PostgreSQL
- JavaScript
- express-validator
- Git/GitHub
API Endpoints
Method	Endpoint	Description
GET	/api/tasks	Get tasks
POST	/api/tasks	Create a task
GET	/api/tasks/:id	Get a task by ID
PUT	/api/tasks/:id	Update a task
DELETE	/api/tasks/:id	Delete a task


All task routes require authentication. User-specific authorization for GET, PUT, and DELETE is still in progress.
Create a Task
POST /api/tasks
Example request:
{
  "title": "Learn API security",
  "description": "Practice secure REST API development"
}
Task creation requires an authenticated user. The task is associated with that user through user_id.
Get All Tasks
GET /api/tasks
Returns tasks from the database. User-specific authorization is still in progress.
Get a Single Task
GET /api/tasks/:id
Example:
GET /api/tasks/3
If the task does not exist, the API returns:
{
  "error": "Task not found"
}
Ownership checks for retrieving a task are still in progress.
Authentication
Users can register and log in with Supabase Auth. Authenticated requests provide a JWT, which the API uses to create a request-scoped Supabase client. Task creation uses that client to run in the requesting user's context and associate the task with their user_id.
User-specific authorization for reading, updating, and deleting tasks is still in progress.
Input Validation
Task creation validates incoming data before it reaches the database.
Current validation includes:
- Title is required
- Title must be a string
- Title maximum length is 100 characters
- Description must be a string when provided
- Description maximum length is 500 characters
Invalid input returns HTTP 400 Bad Request.
Database Security
The project uses Supabase with PostgreSQL and has Row Level Security (RLS) enabled on the tasks table. The RLS policies have been verified.
Task ownership is recorded in user_id, and authenticated task creation is implemented. User-specific authorization for reading, updating, and deleting tasks is still being completed and verified in the API.
Project Structure
secure-task-api/
├── src/
│   ├── controllers/
│   │   └── taskController.js
│   ├── middleware/
│   │   └── taskValidation.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── tasks.js
│   ├── services/
│   │   ├── authService.js
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
Setup
1. Clone the repository
git clone https://github.com/calebeberechukwu14-lang/secure-task-api.git
cd secure-task-api
2. Install dependencies
npm install
3. Configure environment variables
Create a .env file based on .env.example.
SUPABASE_URL=your_supabase_project_url
SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
Never commit the .env file or expose credentials publicly. Do not put Supabase secret or service-role keys in client-side code.
4. Start the server
npm start
The API will run at:
http://localhost:3000
Example Requests
The protected task routes require a valid Supabase access token. Supply it as a bearer token when making authenticated requests.
Create a task:
$headers = @{ Authorization = "Bearer <access-token>" }
Invoke-RestMethod -Uri "http://localhost:3000/api/tasks" -Method Post -Headers $headers -ContentType "application/json" -Body '{"title":"Learn API security","description":"Practice secure REST API development"}'
Retrieve tasks:
$headers = @{ Authorization = "Bearer <access-token>" }
Invoke-RestMethod -Uri "http://localhost:3000/api/tasks" -Headers $headers
Retrieve a task by ID:
$headers = @{ Authorization = "Bearer <access-token>" }
Invoke-RestMethod -Uri "http://localhost:3000/api/tasks/3" -Headers $headers
Security Development Roadmap
Work in progress or planned:
- Complete and verify user-specific authorization for GET, PUT, and DELETE task operations
- Add automated API tests
- Perform deeper security testing, including ownership and IDOR checks
- Add rate limiting
- Add security headers
- Publish API documentation
- Prepare and verify production deployment
- Improve error handling
Learning Goals
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
- OWASP-style web application security concepts
