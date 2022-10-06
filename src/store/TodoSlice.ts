import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../react-app-env";

type TodoState = {
  list: Todo[],
  isLoading: boolean,
  error: boolean,
}

const initialState: TodoState = {
  list: [],
  isLoading: false,
  error: false,
}

export const fetchTodos = createAsyncThunk<Todo[], undefined, { rejectValue: string }>(
  'todos/fetchTodos',
  async function (_, { rejectWithValue }) {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');

    if (!response.ok) {
      return rejectWithValue('Server error!')
    }

    const data = response.json();

    return data;
  }
)

const TodoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<string>) {
      state.list.push({
        id: Math.random(),
        title: action.payload,
        completed: false,
      })
    },
    changeTodoStatus(state, action: PayloadAction<number>) {
      const todo = state.list.find(todo => todo.id === action.payload);

      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    removeTodo(state, action: PayloadAction<number>) {
      state.list = state.list.filter(todo => todo.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.list = action.payload;
        state.isLoading = false;
        state.error = false;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
    }
})


export const { addTodo, changeTodoStatus, removeTodo } = TodoSlice.actions;
export default TodoSlice.reducer;