import {Express,Request,Response} from "express"
import { registerUserHandler,loginUserHandler } from "./controller/user.controller";
import validateRequest from "./middleware/validateRequest";
import {createUserSchema,createUserLoginSchema} from "./schema/user.schema";
import { createTodoSchema, deleteTodoSchema, updateTodoStateSchema } from "./schema/todo.schema";
import { createTodoHandler,deleteTodoHandler,getCompleteTodosHandler,getPendingTodosHandler,getSingleTodoHandler,getTodosHandler, updateTodoHandler } from "./controller/todo.controller";
import authorizeUser from "./middleware/authorizeUser";


export default function(app:Express){

    // Register User
     app.post("/auth/signup",validateRequest(createUserSchema),registerUserHandler);

     //Login User
     app.post("/auth/login",validateRequest(createUserLoginSchema),loginUserHandler);

    // create todo
    app.post('/saveTodo', authorizeUser,validateRequest(createTodoSchema), createTodoHandler);

    //get all todos for specific user
     app.get('/',authorizeUser,getTodosHandler);

     //get Complete todos for specific user
     app.get('/completeTodos',authorizeUser,getCompleteTodosHandler);

     //get Pending todos for specific user
     app.get('/pendingTodos',authorizeUser,getPendingTodosHandler);

     //get single Todo with Id
     app.get('/todos/:todoId',[validateRequest(deleteTodoSchema),authorizeUser],getSingleTodoHandler);

     // update Todo state 
     app.post('/edit/:todoId',[validateRequest(updateTodoStateSchema),authorizeUser],updateTodoHandler);

    // delete Todo state 
    app.post('/delete/:todoId',[validateRequest(deleteTodoSchema),authorizeUser],deleteTodoHandler);

    
}