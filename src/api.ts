import { Todo } from "./react-app-env";

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=20');

  return response.json();
}