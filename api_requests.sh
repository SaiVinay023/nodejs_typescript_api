#!/bin/bash

# CREATE USER
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice",
    "surname": "Johnson",
    "birth_date": "1995-03-12",
    "sex": "female"
}'

echo -e "\n----- User Created -----\n"

# GET USERS
curl -X GET http://localhost:3000/users
echo -e "\n----- Users List -----\n"

# UPDATE USER (ID = 1)
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Updated",
    "surname": "Johnson",
    "birth_date": "1995-03-12",
    "sex": "female"
}'
echo -e "\n----- User Updated -----\n"

# SOFT DELETE USER (ID = 1)
curl -X PATCH http://localhost:3000/users/1/soft-delete
echo -e "\n----- User Soft Deleted -----\n"

# HARD DELETE USER (ID = 1)
curl -X DELETE http://localhost:3000/users/1
echo -e "\n----- User Hard Deleted -----\n"

# CREATE GROUP
curl -X POST http://localhost:3000/groups \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Developers"
}'
echo -e "\n----- Group Created -----\n"

# GET GROUPS
curl -X GET http://localhost:3000/groups
echo -e "\n----- Groups List -----\n"

# UPDATE GROUP (ID = 4)
curl -X PUT http://localhost:3000/groups/4 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Backend Developers"
}'
echo -e "\n----- Group Updated -----\n"

# JOIN GROUP (User 6 -> Group 4)
curl -X POST http://localhost:3000/groups/6/groups/4
echo -e "\n----- User Joined Group -----\n"

# LEAVE GROUP (User 6 -> Group 4)
curl -X DELETE http://localhost:3000/groups/6/groups/4
echo -e "\n----- User Left Group -----\n"
