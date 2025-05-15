# RECORDS_MANAGEMENT SYSTEM FOR BANTALI CLINIC

-This system includes a record management system, appointment system and a simple inventory system
-This project used PERN stack (Postgres, Express, React and Node) language used is Javascript
-It also made use of Sequelize, tailwind and shadcn library

Requirements
    - PostgreSQL (pgAdmin4) 
    - NodeJS (any version)
    - Postman

How to run

    SETTING UP DATABASE
    -Open pgAdmin4, create a new database name it bantali_database
    -Open the source code in vscode and go to server folder 
    -Go to .env file and replace password with your pgAdmin password
    
    RUNNING FRONTEND 
    -Go to client folder
    -run "npm i" in the terminal
    -after installed successfully
    -run "npm run dev"

    RUNNING SERVER
    -open another terminal
    -go to server folder
    -run "npm i" in the terminal
    -after installed successfully
    -run "npm run dev"

    LOGGING IN
    -Since the database is empty there will be no account available
    -We need to populate it with a user
    -I MADE THE REGISTER USER ENDPOINT PUBLIC FOR THIS REASON
    -Open postman
    -enter this in the URL : http://localhost:3002/api/users/register
    -SELECT POST on the dropdown beside the URL
    -Go to body below the URL select JSON on the dropdown
    -Paste the following on the space
        {
            "name": "admin",
            "user_name":"admin123",
            "email":"your_email_here@gmail.com",
            "role":"Admin",
            "password":"admin123"
        }
    -It should have a response that says user was added
    - Now you can visit admin.localhost:5173 or the admin.localhost:5174
    - Login username: admin123 and pass: admin123
    