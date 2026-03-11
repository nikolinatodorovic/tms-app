# Transaction Management System (TMS)

This is a full-stack project that implements a simple **Transaction Management System** with:

- **Backend API** built with FastAPI (Python, Pydantic)
- **Frontend web application** built with React (Vite, CSS)
- **CSV file storage** for transactions

Users can view transactions and add new ones through the web interface.

---

# Prerequisites

Install the following software before running the project:

**Python** (version 3.8 or higher)

Check installation:

```bash
python --version
```

Download if needed:
https://www.python.org/downloads/

**Node.js** (version 20 or higher)

Check installation:

```bash
node -v
```

Download if needed:
https://nodejs.org

**npm**

npm is installed automatically with Node.js.

Check version:

```bash
npm -v
```

---

# How to start the application?

1. Clone the repository:

```bash
git clone https://github.com/nikolinatodorovic/tms-app
cd tms-app
```

---

2. Start Backend

Navigate to the backend folder:

```bash
cd tms-backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment.

Windows:

```bash
venv\Scripts\activate
```

Mac/Linux:

```bash
source venv/bin/activate
```

Install backend dependencies:

```bash
pip install -r requirements.txt
```

---

Start the FastAPI server:

```bash
uvicorn app.main:app --reload
```

Transactions are stored in a CSV file located at: **tms-backend/data/transactions.csv**. No environment variables are required.

The API will run at:

http://127.0.0.1:8000

3. Start Frontend

In separate terminal, navigate to the frontend folder:

```bash
cd tms-app
cd tms-frontend
```

Install dependencies:

```bash
npm install
```

---

Start the development server:

```bash
npm run dev
```

Open in browser:
http://localhost:5173

---

# API Endpoints

**GET /transactions**

Returns all transactions stored in the CSV file.

Example response:

```bash
[
{
  "transaction_date": "2025-03-01",
  "account_number": "7289-3445-1121",
  "account_holder_name": "Maria Johnson",
  "amount": 150.00,
  "status": "Settled"
}, ...
]
```

**POST /transactions**

Creates a new transaction.

Example request body:

```bash

{
  "transaction_date": "2026-03-10",
  "account_number": "1234-5678-9012",
  "account_holder_name": "John Doe",
  "amount": 250.75
}
```

Status is optional. If not present, backend will randomly assign one of the statuses: Pending, Settled or Failed

---

# Testing the Application

Backend testing:

FastAPI automatically generates interactive API documentation.
After running the backend, open Swagger UI:

http://127.0.0.1:8000/docs

Test endpoints:
GET /transactions  
POST /transactions

Frontend testing:

After running the backend and the frontend, open:

http://localhost:5173

Verify that:

- transactions load correctly
- new transactions can be added
- table updates automatically
- status colors are displayed correctly
- pagination is implemented, with 5 items per page

Follow the steps described in **Using the Application** section to test.

---

## Using the Application

1. Open the frontend application in the browser.
2. The table displays all transactions retrieved from the backend.
3. Click **Add Transaction**.
4. Fill in the form fields and submit the form.
5. The new transaction will appear in the table.
