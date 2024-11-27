
# Project Documentation

## Starting the Project Locally

### Without Containers
To run the project locally without Docker containers, follow these steps:

#### Frontend
1. Navigate to the `client` folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Start the development server:
   ```bash
   yarn dev
   ```

#### Backend
1. Navigate to the `server` folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

### Using Docker
To manage the project with Docker containers, use the following commands:

- **Start the containers**:
  ```bash
  docker-compose up
  ```
- **Bring down the containers**:
  ```bash
  docker-compose down
  ```
- **Start the containers (after stopping)**:
  ```bash
  docker-compose start
  ```
- **Stop the containers**:
  ```bash
  docker-compose stop
  ```

---

## Project Status

### Backend Development
 Below is a list of the available endpoints:

- **Postman Link**: [Postman Collection](https://www.postman.com/martian-moon-205350/workspace/task-1/collection/14661662-43d229ec-917a-4b72-8556-1d6789df4eec?action=share&creator=14661662)

- **Base API Endpoint**:  
  `/api/v1`

---



## API Endpoints

### Authentication 
- **POST** `/sign-up`  
  Create a new user account.
- **POST** `/verify-otp`  
  Verify user account using OTP.
- **POST** `/request-otp`  
  Request a new OTP for verification.
- **POST** `/sign-out`  
  Log out from the system.

---

### Movies Endpoints
- **GET** `/movies?page=1&size=10`  
  Retrieve all that belongs to the authenticated user.
- **GET** `/movie/:id`  
  Retrieve details of a specific movie.
- **DELETE** `/movie/:id`  
  Deletes a selected movie.
- **PATCH** `/update/movie/:id`  
  Update a selected movie.
- **POST** `/movie/`  
  Creates a \ movie.

---
