import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from './TodoSlice'

const store = configureStore({
  reducer: {
    todos: TodoReducer,
  }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;