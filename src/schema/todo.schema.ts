import { object, string } from "yup";

const payload = {
  body: object({
    name: string().required("Name is required"),
    title: string().required("Title is required"),
    desc: string()
      .required("Body is required")
      .min(120, "Body is too short - should be 120 chars minimum."),
  }),
};

const params = {
  params: object({
    todoId: string().required("todoId is required"),
  }),
};

export const createTodoSchema = object({
  ...payload,
});

const statePayload = {
    body: object({
      state: string().required("state is required"),
    }),
  };
  

export const updateTodoStateSchema = object({
  ...params,
  ...statePayload,
});

export const deleteTodoSchema = object({
  ...params,
});