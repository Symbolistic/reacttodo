import React, {useState, useRef, useEffect} from 'react';
import TodoList from './TodoList'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos){
      setTodos(storedTodos)
    }
  }, [])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id ===id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  useEffect (() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function handleAddTodo(e){
    const name = todoNameRef.current.value
    if (name === '') {
      return
    } else {
      setTodos(prevTodos => {
        return [...prevTodos, {id: name + Math.random(), name: name, complete: false}]
      })
      todoNameRef.current.value=null
    }
  }

  function handleClearTodos (){
    const newTodos = todos.filter(val => !val.complete)
    setTodos (newTodos)
  }

  return (
    <div>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type ="text" />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Complete</button>
      <div>{todos.filter(val => !val.complete).length} left to do</div>
    </div>
  );
}

export default App;
