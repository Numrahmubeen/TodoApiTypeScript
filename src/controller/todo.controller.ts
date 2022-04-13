import { Request, Response } from "express";
import { get } from "lodash";
import { createTodo,findTodo,getTodos,findAndUpdate, deleteTodo } from "../service/todo.service";


export async function createTodoHandler(req: Request, res: Response) {
  try {

    const user_id = get(req,"user._id");
    const body = req.body;
    const post = await createTodo({...body,user_id:user_id,state:"P"})
    return res.send(post);
  } catch (e) {
    console.log(e);
    return res.status(409).send(e);
  }
}

export async function getTodosHandler(req: Request, res: Response) {
    const user_id = get(req, "user._id");

    const posts = await getTodos({ user_id });
  
    if (!posts) {
      return res.sendStatus(404);
    }
  
    // if (String(post.user) !== String(userId)) {
    //   return res.sendStatus(401);
    // }

    return res.send(posts);
  }
  export async function getPendingTodosHandler(req: Request, res: Response) {
    const user_id = get(req, "user._id");
    const state = "P";

    const posts = await getTodos({ user_id,state });
  
    if (!posts) {
      return res.sendStatus(404);
    }
  
    // if (String(post.user) !== String(userId)) {
    //   return res.sendStatus(401);
    // }

    return res.send(posts);
  }
  export async function getCompleteTodosHandler(req: Request, res: Response) {
    const user_id = get(req, "user._id");
    const state = "C";

    const posts = await getTodos({ user_id , state});
  
    if (!posts) {
      return res.sendStatus(404);
    }
  
    // if (String(post.user) !== String(userId)) {
    //   return res.sendStatus(401);
    // }

    return res.send(posts);
  }

  export async function getSingleTodoHandler(req: Request, res: Response) {
    const todoId:string = get(req, "params.todoId");

    var mongoose = require('mongoose');
    var _id = mongoose.Types.ObjectId(todoId);

    console.log(todoId);
    const todo = await findTodo({ _id});
  

    if (!todo) {
      return res.sendStatus(404);
    }

  
    return res.send(todo);
  }

  export async function updateTodoHandler(req: Request, res: Response) {
    const user_id = get(req, "user._id");
    const _id = get(req, "params.todoId");
    const state = req.body.state;
    console.log("state: "+state);
    if(state != "C" && state != "P")
        return res.status(401).send("State can be C or P");
    const update = req.body;
    const todo = await findTodo({ _id, user_id});
    console.log(todo);
  
    if (!todo) {
      return res.status(404);
    }
  
    if (String(todo.user_id) !== user_id) {
      return res.sendStatus(401);
    }
  
    const updatedTodo = await findAndUpdate({ _id }, update, { new: true });
    console.log(updatedTodo);
  
    return res.send(updatedTodo);
  }

  export async function deleteTodoHandler(req: Request, res: Response) {
    const user_id = get(req, "user._id");
    const _id = get(req, "params.todoId");
  
    const todo = await findTodo({ _id });
  
    if (!todo) {
      return res.sendStatus(404);
    }
  
    if (String(todo.user_id) !== String(user_id)) {
      return res.sendStatus(401);
    }
  
    await deleteTodo({ _id });
  
    return res.status(200).send("Successfully Deleted");
  }