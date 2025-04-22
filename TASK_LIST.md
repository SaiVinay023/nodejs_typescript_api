# ✅ Project Implementation Task List

## ⚙️ Setup
- [x] Initialize Node.js project with TypeScript
- [x] Install Express, dotenv, ts-node-dev, mysql2, Joi
- [x] Configure TypeScript (`tsconfig.json`)
- [x] Setup Docker and MySQL via `docker-compose.yml`
- [x] Create `.env` for database credentials
- [x] Write `init.sql` to create tables: users, groups, user_groups

## 👤 User Module
- [x] Create User (POST `/users`)
- [x] Get Single User (GET `/users/:id`)
- [x] List Users with Pagination (GET `/users?limit&offset`)
- [x] Update User (PUT `/users/:id`)
- [x] Delete User (DELETE `/users/:id`)

## 👥 Group Module
- [x] Create Group (POST `/groups`)
- [x] List All Groups (GET `/groups`)
- [x] Update Group Name (PUT `/groups/:id`)
- [x] Delete Group (DELETE `/groups/:id`)

## 🔄 User-Group Relations
- [x] Join Group (POST `/users/:id/groups/:groupId`)
- [x] Leave Group (DELETE `/users/:id/groups/:groupId`)
- [ ] List User’s Groups (GET `/users/:id/groups`)
- [ ] List Group’s Users (GET `/groups/:id/users`)

## 🧪 Testing
- [x] Configure Jest and Supertest
- [x] Write tests for user endpoints
- [x] Write tests for group endpoints
- [ ] Add tests for join/leave group

## 🧠 Code Structure & Refactoring
- [x] Setup layered architecture: controller → service → model
- [x] Centralize DB access via `query.ts`
- [x] Use raw SQL queries only (no ORM)
- [x] Implement validation with Joi
- [x] Add centralized error handling with custom `ApiError`

## 🐛 Bug Fixes
- [x] Fix SQL LIMIT/OFFSET binding error
- [x] Correct invalid model references (`userModel` vs `groupModel`)
- [x] Resolve TypeScript module errors (`is not a module`)
- [x] Fix request parsing errors (e.g., undefined body)
- [x] Resolve Docker + CORS integration issues

## 📦 Enhancements / Roadmap
- [ ] Add Swagger API documentation
- [ ] Add role-based access (admin, staff, developer)
- [ ] Implement user authentication (JWT)
- [ ] Add CI pipeline using GitHub Actions
- [ ] Create seed script for default users/groups
- [ ] Deploy backend using Dockerfile or Railway