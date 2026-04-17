import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";

import { Todo, TodoInfo, TodoStatus } from "../../types";
import { addTask, getTasks } from "../../api/tasks";

interface TodoState {
  todos: Todo[];
  countTasks: TodoInfo;
  loading: boolean;
}

const initialState: TodoState = {
  todos: [],
  countTasks: { all: 0, completed: 0, inWork: 0 },
  loading: false,
};

export const addNewTask = createAsyncThunk(
  "todos/addNewTask",
  async (title: string) => {
    const response = await addTask({ title, isDone: false });
    return response;
  },
);

export const fetchAllTask = createAsyncThunk(
  "todos/fetchAllTask",
  async (status: TodoStatus) => {
    const response = await getTasks(status);
    return response;
  },
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTask.fulfilled, (state, action) => {
        state.todos = action.payload.data;
        if (action.payload.info) {
          state.countTasks = action.payload.info;
        }
      })

      .addCase(addNewTask.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.push(action.payload);
        state.countTasks.all += 1;
        state.countTasks.inWork += 1;
      });
  },
});

export default todoSlice.reducer;
