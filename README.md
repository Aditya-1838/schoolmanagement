# API SCHOOL MANAGEMENT

## Database Integration

While working on this project, I faced challenges in securing a free MySQL hosting service. As a result, I opted to use MongoDB for the database integration.

However, I have commented out the SQL-related code within the codebase for reference. You can find these sections and review the structure and queries I had intended to use with MySQL. The SQL implementation can be easily enabled when an appropriate hosting solution is available.

I am confident in my knowledge of SQL, and I can seamlessly integrate it into the project when required.



### ENDPOINTS:


```json
### 1. POST /api/addSchool

Description: Adds a new school to the database.

Request Body:



{
  "name": "School Name",
  "address": "School Address",
  "latitude": 12.345678,
  "longitude": 98.765432
}

 

Response:

    Success (201 Created):

{
  "message": "School added successfully.",
  "schoolId": "school_id_here"
}

    Error (400 Bad Request):

{
  "message": "All fields are required."
}

 ## 2. GET /api/getAllSchools

Description: Fetches all schools from the database.

Response:

    Success (200 OK):

{
  "schools": [
    {
      "_id": "school_id_1",
      "name": "School 1",
      "address": "123 School St",
      "latitude": 12.345678,
      "longitude": 98.765432
    },
    {
      "_id": "school_id_2",
      "name": "School 2",
      "address": "456 Another St",
      "latitude": 23.456789,
      "longitude": 76.543210
    }
  ]
}

## 3. GET /api/listSchools

Description: Lists schools based on their proximity to the provided latitude and longitude.

Query Parameters:

    latitude: The latitude of the user's location.
    longitude: The longitude of the user's location.

Request Example:

GET /api/listSchools?latitude=12.345678&longitude=98.765432

Response:

    Success (200 OK):

{
  "schools": [
    {
      "_id": "school_id_1",
      "name": "School 1",
      "address": "123 School St",
      "latitude": 12.345678,
      "longitude": 98.765432,
      "distance": 0
    },
    {
      "_id": "school_id_2",
      "name": "School 2",
      "address": "456 Another St",
      "latitude": 23.456789,
      "longitude": 76.543210,
      "distance": 10.5
    }
  ]
}

Example Requests
Add a School

To add a school, send a POST request to /api/addSchool with the following body:

{
  "name": "Green Valley School",
  "address": "123 Green Valley Road",
  "latitude": 12.345678,
  "longitude": 98.765432
}
