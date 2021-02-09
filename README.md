# Online Survey Platform (backend)

 A content management system to create, edit, and delete the surveys. 
 
 Tech stack: MySQL database, Express, React, Redux and Docker

## Prerequisites

Node.js and Docker desktop installed. 

## Getting Started

### 1. Clone repo
```
$ git clone https://github.com/enid722/OSP_backend.git

$ cd OSP_backend
```

### 2. Build the images for client and server
```
docker-compose build
```

### 3. Start the docker images in detached mode
```
$ docker-compose up -d
```

### 4. Access the application on browser
The React App is default running on http://localhost:3000/

## Known issues to be fixed
1. Problems may occur in saving choices when updating the survey that included Likert Scale question

## Pending items
1. Handling survey responses
2. Modifying Likert Scale points
3. Form validation
4. Popup alert when deleting survey