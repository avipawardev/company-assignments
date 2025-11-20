# Server API - Simple Routes Guide

This file lists all API routes in this server in very simple English.

Base URL: the server address (for example: https://refer-employee.onrender.com)

Authentication: Many routes need a token. Add a header `Authorization: Bearer <token>` after you log in.

---

## 1) Sign up a new user

- Method: POST
- Path: /auth/signup
- Auth: No
- Body (JSON): { name, email, password }
- What it does: Creates a new user. Password is saved safely (hashed).
- Success: returns 201 and a message + the new user object.

## 2) Log in

- Method: POST
- Path: /auth/login
- Auth: No
- Body (JSON): { email, password }
- What it does: Checks your email and password. If correct, it returns a token you can use for other routes.
- Success: returns 201 and JSON with { token, user }

---

All routes below require the Authorization header with a valid token.

## 3) Create a candidate (refer someone)

- Method: POST
- Path: /candidates/create
- Auth: Yes
- Body (form-data): name, email, phone, jobTitle, optional file field `resume` (for upload)
- What it does: Saves a candidate referred by the logged-in user. If you upload a file, server saves it and returns a link.
- Success: returns 201 and the created candidate object.

## 4) Get your candidates

- Method: GET
- Path: /candidates/get-candidates
- Auth: Yes
- What it does: Returns a list of candidates you referred, newest first.
- Success: returns JSON array of candidate objects.

## 5) Update a candidate's status

- Method: PUT
- Path: /candidates/edit-candidates/:id
- Auth: Yes
- URL param: :id is the candidate id to update
- Body (JSON): { status } where status is one of: "Pending", "Reviewed", "Hired"
- What it does: Changes the status if the candidate belongs to you.
- Success: returns the updated candidate object.

## 6) Delete a candidate

- Method: DELETE
- Path: /candidates/delete-candidates/:id
- Auth: Yes
- URL param: :id is the candidate id to delete
- What it does: Deletes the candidate if it belongs to you.
- Success: returns { message: 'Deleted' }

## 7) Get metrics (counts)

- Method: GET
- Path: /candidates/metrics
- Auth: Yes
- What it does: Returns counts for your candidates: total, pending, reviewed, hired.
- Success: returns JSON like { total, pending, reviewed, hired }

---

Notes and quick tips:

- Always include the Authorization header like: `Authorization: Bearer <token>` for protected routes.
- Signup requires name, email and password.
- When creating a candidate, all fields except resume are required: name, email, phone, jobTitle.
- Status must be one of: Pending, Reviewed, Hired.
- If a route returns 401, the token is missing or invalid. If it returns 404 for a candidate, the id may be wrong or the candidate belongs to someone else.

If you want, I can add example curl commands for each route or Postman collection.
