import { useEffect, useState } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import { useAppDispatch, useAppSelector } from './hooks';
import { addTodo, fetchTodos } from './store/TodoSlice';

function App() {
  const [todoTittle, setTodoTittle] = useState('');
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.todos)

  const onAdd = () => {
    if (todoTittle) {
      dispatch(addTodo(todoTittle));
    }

    setTodoTittle('');
  }

  useEffect(() => {
    dispatch(fetchTodos());
  }, [])

  return (
    <div className="App">
      <div className='addTodoBlock'>
        <input
          type="text"
          value={todoTittle}
          onChange={(event) => setTodoTittle(event.target.value)}
        />
        <button onClick={onAdd}>Add todo</button>
      </div>
      {isLoading && <h1>Loading...</h1>}
      {error && <h1>Couldn't fetch todos</h1>}
      <TodoList />
    </div>
  );
}

export default App;
