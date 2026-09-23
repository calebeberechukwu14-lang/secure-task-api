\# Secure Task API



A RESTful task-management API built with Node.js, Express, Supabase, and PostgreSQL.



This project is being developed as a practical portfolio project to demonstrate backend development, REST API design, database integration, input validation, error handling, and application security practices.



\## Current Features



\- REST API built with Express

\- PostgreSQL database through Supabase

\- Create tasks

\- Retrieve all tasks

\- Retrieve a task by ID

\- Input validation with `express-validator`

\- HTTP status codes for validation and missing resources

\- Row Level Security (RLS) enabled in Supabase

\- Environment variables for configuration

\- Centralized error handling

\- Git/GitHub version control



\## Tech Stack



\- Node.js

\- Express.js

\- Supabase

\- PostgreSQL

\- JavaScript

\- express-validator

\- Git/GitHub



\## API Endpoints



| Method | Endpoint | Description |

|---|---|---|

| GET | `/api/tasks` | Get all tasks |

| POST | `/api/tasks` | Create a task |

| GET | `/api/tasks/:id` | Get a task by ID |



\### Create a Task



`POST /api/tasks`



Example request:



```json

{

&#x20; "title": "Learn API security",

&#x20; "description": "Practice secure REST API development"

}

```



\### Get All Tasks



`GET /api/tasks`



Returns the tasks stored in the database.



\### Get a Single Task



`GET /api/tasks/:id`



Example:



```text

GET /api/tasks/3

```



If the task does not exist, the API returns:



```json

{

&#x20; "error": "Task not found"

}

```



\## Input Validation



Task creation validates incoming data before it reaches the database.



Current validation includes:



\- Title is required

\- Title must be a string

\- Title maximum length is 100 characters

\- Description must be a string when provided

\- Description maximum length is 500 characters



Invalid input returns HTTP `400 Bad Request`.



\## Database Security



The project uses Supabase with PostgreSQL and has Row Level Security (RLS) enabled on the `tasks` table.



During the current development stage, temporary development policies allow public task creation and reading.



These policies are intentionally temporary.



As authentication and authorization are implemented, the policies will be replaced with user-specific access controls so users can only access their own tasks.



\## Project Structure



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



\## Setup



\### 1. Clone the repository



```bash

git clone <repository-url>

cd secure-task-api

```



\### 2. Install dependencies



```bash

npm install

```



\### 3. Configure environment variables



Create a `.env` file based on `.env.example`.



```env

SUPABASE\_URL=your\_supabase\_project\_url

SUPABASE\_PUBLISHABLE\_KEY=your\_supabase\_publishable\_key

```



Never commit the `.env` file or expose its credentials publicly.



\### 4. Start the server



```bash

npm start

```



The API will run on:



```text

http://localhost:3000

```



\## Example Testing



Create a task:



```powershell

Invoke-RestMethod -Uri "http://localhost:3000/api/tasks" -Method Post -ContentType "application/json" -Body '{"title":"Learn API security","description":"Practice secure REST API development"}'

```



Retrieve all tasks:



```powershell

Invoke-RestMethod -Uri "http://localhost:3000/api/tasks"

```



Retrieve a task by ID:



```powershell

Invoke-RestMethod -Uri "http://localhost:3000/api/tasks/3"

```



\## Security Development Roadmap



Planned improvements include:



\- Update tasks

\- Delete tasks

\- Authentication

\- Authorization

\- User-specific task ownership

\- Stronger Supabase RLS policies

\- Automated API tests

\- Security-focused testing

\- API documentation

\- Rate limiting

\- Improved error handling

\- Security headers

\- Production deployment



\## Learning Goals



This project is being developed to build practical experience with:



\- REST API development

\- Backend architecture

\- PostgreSQL databases

\- Authentication and authorization

\- Input validation

\- Access control

\- Row Level Security

\- API testing

\- Secure coding practices

\- Git/GitHub workflows

\- OWASP-style web application security concepts

