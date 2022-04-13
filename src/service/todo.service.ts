import {
    DocumentDefinition,
    FilterQuery,
    UpdateQuery,
    QueryOptions,
  } from "mongoose";
  import Todo, { TodoDocument } from "../model/todo.model";
  
  export function createTodo(input: DocumentDefinition<TodoDocument>) {
    try {
        return Todo.create(input);
      } catch (err) {
        throw new Error(" "+err);
      }  
  }
  export function findAndUpdate(
    query: FilterQuery<TodoDocument>,
    update: UpdateQuery<TodoDocument>,
    options: QueryOptions
  ) {
    return Todo.findOneAndUpdate(query, update, options);
  }
  
  export function getTodos(query: FilterQuery<TodoDocument>) {
    return Todo.find(query);
  }
  export function getPendingTodos(query: FilterQuery<TodoDocument>) {
    return Todo.find(query);
  }
  export function getCompleteTodos(query: FilterQuery<TodoDocument>) {
    return Todo.find(query);
  }

export function findTodo(
    query: FilterQuery<TodoDocument>,
    options: QueryOptions = { lean: true }
  ) {
    return Todo.findOne(query, {}, options);
  }

  export function deleteTodo(query: FilterQuery<TodoDocument>) {
    return Todo.deleteOne(query);
  }
  