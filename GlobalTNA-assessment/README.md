# Mini Service Request Board - GlobalTNA Assessment

A full-stack web application where homeowners can post home service requests and tradespeople can browse open jobs, view their details, and update their status. Built as part of the GlobalTNA Full-Stack Developer Intern Technical Assessment.

---

## Live Demo

- **Frontend (Vercel):** https://mini-service-request-board-eem6.vercel.app/
- **Backend (Railway):** https://mini-service-request-board-production-d33a.up.railway.app/

---

## Tech Stack

**Frontend**

- Next.js (App Router)
- React
- Tailwind CSS v4
- JavaScript

**Backend**

- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose ODM

---

## Features

### Core Features

- Browse all service requests on a clean, responsive home page
- Filter jobs by category (Plumbing, Electrical, Painting, Joinery)
- Post a new service request with client-side validation
- View full details of any job request
- Update job status (Open → In Progress → Closed)
- Delete jobs with a confirmation step to prevent accidents
- Loading spinners and consistent error states throughout the app
- Custom 404 page for invalid routes
- Success banner after posting a new request

### Bonus Features Implemented

- Seed script that populates the database with eight sample jobs in a single command

---

## Project Structure

```
globaltna-assessment/
├── backend/
│   ├── src/
│   │   ├── middleware/
│   │   │   └── errorHandler.js
│   │   ├── models/
│   │   │   └── JobReq.js
│   │   ├── routes/
│   │   │   └── jobs.js
│   │   └── app.js
│   ├── seed.js
│   ├── package.json
│   └── .env
└── frontend/
    ├── app/
    │   ├── components/
    │   │   ├── JobCard.jsx
    │   │   ├── CategoryFilter.jsx
    │   │   └── Spinner.jsx
    │   ├── jobs/
    │   │   ├── new/
    │   │   │   └── page.jsx
    │   │   └── [id]/
    │   │       └── page.jsx
    │   ├── globals.css
    │   ├── layout.jsx
    │   ├── not-found.jsx
    │   └── page.jsx
    ├── package.json
    └── .env.local
```

---

## Prerequisites

Before running the project, make sure you have:

- **Node.js 18 or higher** installed
- A **MongoDB Atlas** account (free tier is sufficient)
- **npm** for managing dependencies

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/realthash/Mini-Service-Request-Board.git
cd globaltna-assessment
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory and add the following:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

Replace `your_mongodb_atlas_connection_string` with the connection string from your MongoDB Atlas cluster. Append `/globaltna` at the end of the URI so Mongoose uses a dedicated database for this project.

### 3. Set up the frontend

```bash
cd ../frontend
npm install
```

Create a `.env.local` file in the `frontend/` directory and add:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

This variable tells the frontend where to send API requests.

---

## Required Environment Variables

### Backend - `backend/.env`

| Variable    | Description                         | Example                                                 |
| ----------- | ----------------------------------- | ------------------------------------------------------- |
| `PORT`      | The port the Express server runs on | `5000`                                                  |
| `MONGO_URI` | The MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/globaltna` |

### Frontend - `frontend/.env.local`

| Variable              | Description                 | Example                 |
| --------------------- | --------------------------- | ----------------------- |
| `NEXT_PUBLIC_API_URL` | Base URL of the backend API | `http://localhost:5000` |

> The `NEXT_PUBLIC_` prefix is required by Next.js so the variable can be safely accessed in the browser.

---

## Running the Application

Both the backend and frontend must run at the same time. Open two separate terminals.

### Start the backend

```bash
cd backend
npm run dev
```

The API will be available at `http://localhost:5000`.

You should see the following output once the server is ready:

```
Connected to MongoDB
Server running on port 5000
```

### Start the frontend

```bash
cd frontend
npm run dev
```

The web application will be available at `http://localhost:3000`.

---

## Seeding the Database

To populate the database with eight realistic sample jobs in a single step, run:

```bash
cd backend
npm run seed
```

The script clears any existing jobs and inserts fresh sample data covering all categories and statuses. This is useful for quickly trying out the application without having to create records manually.

---

## API Documentation

**Base URL:** `http://localhost:5000/api/jobs`

| Method   | Endpoint        | Description                                                       | Success Code |
| -------- | --------------- | ----------------------------------------------------------------- | ------------ |
| `GET`    | `/api/jobs`     | List all jobs. Supports `?category=` and `?status=` query filters | `200`        |
| `GET`    | `/api/jobs/:id` | Fetch a single job by its ID                                      | `200`        |
| `POST`   | `/api/jobs`     | Create a new job request                                          | `201`        |
| `PATCH`  | `/api/jobs/:id` | Update the status of a job (status only)                          | `200`        |
| `DELETE` | `/api/jobs/:id` | Permanently delete a job                                          | `200`        |

### Data Model - JobRequest

| Field          | Type   | Required | Notes                                             |
| -------------- | ------ | -------- | ------------------------------------------------- |
| `title`        | String | Yes      | The headline of the service request               |
| `description`  | String | Yes      | A detailed description of the issue               |
| `category`     | String | No       | One of: Plumbing, Electrical, Painting, Joinery   |
| `location`     | String | No       | City or area where the service is needed          |
| `contactName`  | String | No       | Name of the homeowner posting the request         |
| `contactEmail` | String | No       | Email address, validated for correct format       |
| `status`       | String | No       | One of: Open, In Progress, Closed (default: Open) |
| `createdAt`    | Date   | Auto     | Set automatically when the document is created    |

### Example Request

```http
POST http://localhost:5000/api/jobs
Content-Type: application/json

{
  "title": "Fix leaking kitchen tap",
  "description": "Kitchen tap has been dripping for three days",
  "category": "Plumbing",
  "location": "Glasgow",
  "contactName": "James MacDonald",
  "contactEmail": "james@example.com"
}
```

---

## Error Handling

The backend uses a global error-handling middleware that returns a consistent JSON shape for every error response:

```json
{
  "error": "Validation Error",
  "message": "Title is required"
}
```

The following error types are handled explicitly:

- **400 Bad Request** - Mongoose validation failures (missing required fields, invalid enum values, malformed email)
- **400 Bad Request** - Invalid MongoDB ObjectId format in URL parameters
- **404 Not Found** - The requested job does not exist
- **500 Internal Server Error** - Unexpected errors (generic message returned for security)

---

## Implementation Notes

- The frontend communicates directly with the Express API as required by the assessment. Next.js API routes are not used as a proxy layer.
- CORS is enabled on the backend so the frontend (running on a different origin during development) can make requests successfully.
- The `PATCH` endpoint only accepts `status` updates. Any other field sent in the request body is intentionally ignored as a basic security measure (a whitelist pattern).
- Mongoose `timestamps` option is used to manage `createdAt` automatically. Clients cannot set or modify this field.
- The delete action in the UI requires explicit confirmation before sending the request, to avoid accidental data loss.
- Sensitive values such as the MongoDB connection string are stored in environment files and excluded from version control via `.gitignore`.
- Search input debouncing was considered but skipped to keep the scope focused on the core requirements within the deadline.

---

## Deployment

### Frontend (Vercel)

1. Push the repository to GitHub.
2. Import the project into Vercel and select the `frontend/` directory as the root.
3. Add the environment variable `NEXT_PUBLIC_API_URL` with the deployed backend URL.
4. Deploy.

### Backend (Railway)

1. Create a new web service from the GitHub repository, pointing to the `backend/` directory.
2. Set the build command to `npm install` and the start command to `npm start`.
3. Add the environment variables `PORT` and `MONGO_URI`.
4. Deploy.

After deployment, update the `NEXT_PUBLIC_API_URL` in the Vercel project to point to the live backend URL.

---

## Author

Built by **Thashmika Rathnayake** as part of the GlobalTNA Full-Stack Developer Intern Technical Assessment.
