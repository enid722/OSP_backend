# Online Survey Platform (backend)

 A content management system to create, edit, and delete the surveys. 
 
 Tech stack: MySQL database, Express, React and Redux

## Prerequisites

Node.js and MySQL database installed. 

## Getting Started

### 1. Clone repo
```
$ git clone https://github.com/enid722/OSP_backend.git

$ cd OSP_backend
```

### 2. Copy the .env-example and rename it to .env file
Change the configuration if needed.

```
cp .env-example .env
```

### 3. Update the proxy in OSP_backend/client/package.json if .env is updated
The host and the port should be same as the config inside .env
```
"proxy": "http://localhost:3001"
```

### 4. Import MySQL database schema using Command line
```
$ mysql -u [db_username] -p[db_password] < create-osp-db.sql
```

### 5. Install dependencies and run the Express
```
$ npm install
$ npm start
```

### 6. Install dependencies and run the React App
```
$ cd client
$ npm install
$ npm start
```
### 7. Access the CMS on browser
The React App is default running on http://localhost:3000/

## Known issues to be fixed
1. Problems may occur in saving choices when updating the survey that included Likert Scale question

## Pending items
1. Handling survey responses
2. Modifying Likert Scale points
3. Form validation
4. Popup alert when deleting survey