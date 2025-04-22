# Node.js + TypeScript User Management Service

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
- **API Testing**: Postman, Curl
- **Version Control**: Git

---

## 🏗️ Project Architecture

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

## ✅ Implementation Task Checklist

### ⚙️ Setup
- [x] Initialized Node.js with TypeScript
- [x] Added Express, ts-node-dev, dotenv
- [x] Configured MySQL in Docker
- [x] Setup `.env` file
- [x] Wrote `init.sql` for DB bootstrapping

### 🧑‍💼 User Module
- [x] `POST /users` — create user with validation
- [x] `GET /users/:id` — get single user
- [x] `GET /users?limit&offset` — paginated list
- [x] `PUT /users/:id` — update user
- [x] `DELETE /users/:id` — delete user

### 👥 Group Module
- [x] `POST /groups` — create group
- [x] `GET /groups` — list all groups
- [x] `PUT /groups/:id` — update group name
- [x] `DELETE /groups/:id` — delete group

### 🔁 User-Group Association
- [x] `POST /users/:id/groups/:groupId` — join group
- [x] `DELETE /users/:id/groups/:groupId` — leave group

### 🧪 Testing & Tools
- [x] Integrated Jest + Supertest
- [x] Wrote test for user creation and listing
- [x] Manual tests in Postman & curl
- [x] Debug logs added for SQL executions

---

## ⚖️ Testing Strategy

### Manual Testing
- ✅ Postman for endpoint testing
- ✅ curl command line testing
- ✅ Browser for GET requests

### Automated Testing
- ✅ Jest + Supertest covering:
  - User: create, read, update, delete
  - Group: create, read, update, delete, join/leave

---

## 🐞 Bugs Fixed

| Bug | Fix |
|-----|-----|
| `Incorrect arguments to mysqld_stmt_execute` | Used template literals for LIMIT/OFFSET instead of placeholders |
| `Cannot find name 'userModel'` | Corrected import and renamed to `groupModel` where appropriate |
| `File is not a module` | Added `export default` in routers |
| `Cannot read property 'name' of undefined` | Fixed request body structure and added validation |
| CORS & Postman errors | Added CORS middleware & headers |
| Missing user-group logic | Added safe checks and logging |

---

## 🔮 Future Enhancements

- [ ] `GET /users/:id/groups` to list user's groups
- [ ] `GET /groups/:id/users` to list group members
- [ ] Swagger/OpenAPI documentation
- [ ] Role-based access control (RBAC)
- [ ] Auth: login/signup using JWT
- [ ] CI/CD pipeline with GitHub Actions
- [ ] Dockerfile for backend deployment

---

## 🔧 Setup Instructions

```bash
# 1. Clone & install
git clone https://github.com/your-repo/nodejs_typescript_api.git
cd nodejs_typescript_api
npm install

# 2. Create .env
echo "PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=yourpassword
DB_NAME=node_service" > .env

# 3. Start DB
docker-compose up -d

# 4. Init DB
docker exec -i mysql-server mysql -uroot -pyourpassword < init.sql

# 5. Run app
npm run dev

# 6. Run tests
npm test
```

---

## 📦 Deliverables

- ✅ Complete backend source code
- ✅ README with API & setup documentation
- ✅ MySQL Docker setup + DB schema SQL
- ✅ Tests with Jest & Supertest
---

## 💡 Coding Approach

This project was built with the mindset of a seasoned backend engineer following best practices in structure, safety, and scalability:

### 📦 Layered Architecture
- **Controller Layer**: Handles request/response logic and input validation.
- **Service Layer**: Manages business logic, cleanly separating it from HTTP or DB concerns.
- **Model Layer**: Executes direct SQL queries using `mysql2/promise`, ensuring strong control over DB logic.

### 🧱 Type-Safe Development
- Written entirely in TypeScript with `strict` mode.
- Custom types for user and group objects to ensure compile-time validation.

### 🛠 Raw SQL Approach
- Instead of an ORM, we use parameterized SQL queries to reduce complexity and optimize performance.
- Custom query executor abstracts query execution and safely handles errors.

### 🧪 Testing First Mindset
- Unit and integration tests are written using Jest and Supertest.
- Each controller endpoint has associated request tests to ensure reliability.

### ⚙️ DevOps-Ready Setup
- Dockerized MySQL for consistent development environment.
- `.env` used to isolate and manage environment-specific configurations.

### 📚 Documentation & Maintenance
- Clean, auto-generated `README.md` with setup, usage, and testing docs.
- Separate `TASK_LIST.md` for transparency and future planning.

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
- **curl** command line testing
- **Browser** for GET requests

### Automated Testing
- **Jest + Supertest**
  - Tests for all CRUD operations of `/users`
  - Tests include: create, read, update, delete
  - Tests for all CRUD operations of `/groups`
  - Tests include: create, read, update, delete, join and leave group


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

