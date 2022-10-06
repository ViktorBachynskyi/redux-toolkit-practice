import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { changeTodoStatus, removeTodo } from '../store/TodoSlice';


const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos.list);
  const dispatch = useAppDispatch();

  return (
    <div className='todoList'>
      {todos.map(todo => (
        <div className='todo' key={todo.id}>
          {todo.title}
          <input type="checkbox" checked={todo.completed} onChange={() => dispatch(changeTodoStatus(todo.id))} />
          <button onClick={() => dispatch(removeTodo(todo.id))}>X</button>
        </div>
      ))}
    </div>
  )
}

export default TodoList;