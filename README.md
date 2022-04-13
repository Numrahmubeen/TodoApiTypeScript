<h1>TodoApi</h1>
<h3>About: </h3>
Simple API Endpoints implemented with typescript, express, mongoose and MongoDB
<h3> Use: </h3>
run npm dev in cmd at the folder location and observe log to know about running Port
# src/routes.ts file contains all of the routes

- "http://localhost:1337/auth/signup" with ( email, name, password) from the request will register new user
- "http://localhost:1337/auth/login" with ( email, password) from the request will login and send token and user info
-That token will be send for following request inside header

    - "http://localhost:1337/" will send all todos stored in DB of that specific user
    - "http://localhost:1337/pending" will send pending todos stored in DB
    - "http://localhost:1337/complete" will send complete todos stored in DB
    - "http://localhost:1337/todos/62568625779494e52c542cf7" will send Single Todo Item with specific id  
    - "http://localhost:1337/saveTodo" will store new todo to request that contain 
      - {
        name:"value",
        title:"value",
        desc:"value",
      }
    - "http://localhost:1337/edit/62568625779494e52c542cf7" will update todo_state to request that contain 
      - { state: "P"/"C" }
    - "http://localhost:1337/delete/62568625779494e52c542cf7" will delete specific todo.
