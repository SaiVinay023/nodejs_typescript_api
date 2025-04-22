# Node.js + TypeScript User Management Service - Implementation Summary

## ✨ Project Overview
We developed a modular, scalable backend service using **Node.js + TypeScript + MySQL**. The service provides RESTful APIs to manage users and user-group relationships, along with robust error handling, input validation, and clean layered architecture.

This project was approached as a **experienced developer** would: with a clean architecture, separation of concerns, strong type safety, security best practices, testing, and Docker-based environment setup.

---

## 🌐 Tech Stack & Tools
- **Backend Language**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MySQL (via Docker container)
- **Validation**: Joi
- **Testing**: Jest + Supertest
- **Environment Management**: dotenv
- **Database Driver**: mysql2 (promise-based)
- **Development**: ts-node-dev, Docker Compose
- **API Testing**: Postman, Thunder Client
- **Version Control**: Git

---

## 🛀 Project Architecture

```
project-root/
│
├── src/
│   ├── controllers/         # Route handlers (UserController, GroupController)
│   ├── services/            # Business logic layer
│   ├── models/              # DB access layer (no ORM used)
│   ├── validations/         # Input validation using Joi
│   ├── db/                  # DB connection and query wrappers
│   ├── routes/              # Express routes
│   ├── utils/               # Shared utilities (ApiError, logger, etc.)
│   └── index.ts             # Main app entry
│
├── tests/                  # Jest unit tests
├── dist/                   # Compiled JS output
├── .env                    # Environment variables
├── tsconfig.json           # TypeScript config
├── package.json            # NPM dependencies & scripts
├── docker-compose.yml      # Docker config for MySQL
└── init.sql                # DB schema creation script
```

---

## 🏃‍♂️ Key Functionalities Implemented

### User Management (Core Requirements):
- [x] **Create User** (`POST /users`)
- [x] **Get Single User** (`GET /users/:id`)
- [x] **List Users with Pagination** (`GET /users?limit=10&offset=0`)
- [x] **Update User** (`PUT /users/:id`)
- [x] **Delete User** (`DELETE /users/:id`)

### Group Management (Advanced Bonus):
- [x] **Create Group** (`POST /groups`)
- [x] **List Groups** (`GET /groups`)
- [x] **Update Group** (`PUT /groups/:id`)
- [x] **Delete Group** (`DELETE /groups/:id`)
- [x] **Join Group** (`POST /users/:id/groups/:groupId`)
- [x] **Leave Group** (`DELETE /users/:id/groups/:groupId`)

---

## 🔧 Setup Instructions

### 1. Clone and Install
```bash
git clone <repo-url>
cd nodejs_typescript_api
npm install
```

### 2. Set Up Environment
Create a `.env` file:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=yourpassword
DB_NAME=node_service
```

### 3. Start MySQL via Docker
```bash
docker-compose up -d
```

### 4. Initialize DB
```bash
docker exec -i mysql-server mysql -uroot -pyourpassword < init.sql
```


### 5. Run Project in Dev Mode
```bash
npm run dev
```

### 6. Run Tests
```bash
npm test
```

---

## ⚖️ Testing Strategy

### Manual Testing
- **Postman** for endpoint testing with different data inputs
- **Thunder Client** inside VS Code
- **Browser** for GET requests

### Automated Testing
- **Jest + Supertest**
  - Tests for all CRUD operations of `/users`
  - Tests include: create, read, update, delete

---

## ⚡ Advanced Dev Practices Used
- Centralized error handling using `ApiError`
- Clean separation of controller/service/model layers
- Type safety using custom `UserInput`, `GroupInput` interfaces
- Environment-aware config using dotenv
- Database run in isolated container via Docker Compose
- Strict `tsconfig` enforcing clean TypeScript code

---

## 📤 What’s Delivered
- Full source code with TypeScript, Docker, MySQL
- API documentation in README.md
- `.env` setup instructions
- `init.sql` script to auto-create tables
- Docker config to spin up database
- Basic unit tests for user functionality

---

Let me know if you want to export this as PDF or Markdown, or also generate the README + Task List next ✅

