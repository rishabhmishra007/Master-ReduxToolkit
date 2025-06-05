import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo, deleteTodo, fetchTodos, updateTodo } from "../store/slice/TodoSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function TodoList() {
  const [currentTodo, setCurrentTodo] = useState("");
  const [currEditTodoId, setCurrEditTodoId] = useState(null);
  //   console.log(currentTodo);

  const dispatch = useDispatch();
  const { todoList, todoFromApi, loading } = useSelector((state) => state.todo);
  //   console.log(todoList);
  // console.log(todoFromApi);
  
  if(loading){
    return <h1>Loading...</h1>
  }

  const handleAddTodo = () => {
    dispatch(addTodo(currentTodo));
    setCurrentTodo("");
    setCurrEditTodoId(null);
  };
  const handleEditTodo = () => {
    dispatch(updateTodo({ currEditTodoId, currentTodo }));
    setCurrentTodo("");
    setCurrEditTodoId(null);
  };

  const handleDeleteTodo = (uniId) => {
    dispatch(deleteTodo(uniId));
  };
  const handleUpdateTodo = (todo) => {
    setCurrEditTodoId(todo.id);
    setCurrentTodo(todo.title);
  };

  const handleFetchFromApi = () => {
    dispatch(fetchTodos())
  }

  

  return (
    <div className="w-full flex flex-col items-center mt-5 gap-2 justify-center">
      <input
        value={currentTodo}
        onChange={(e) => setCurrentTodo(e.target.value)}
        type="text"
        name="todo"
        placeholder="enter your todo"
        className="border rounded p-2"
      />
      <button
        disabled={!currentTodo}
        onClick={currEditTodoId !== null ? handleEditTodo : handleAddTodo}
        className="border rounded p-2 cursor-pointer"
      >
        {currEditTodoId !== null ? "Edit" : "Add"}
      </button>
      <ul>
        {todoList &&
          todoList.map((item) => (
            <li
              key={item.id}
              className="flex gap-3 border rounded p-1.5 items-center"
            >
              <p>
                {item.id}. {item.title}
              </p>
              <button
                onClick={() => handleDeleteTodo(item.id)}
                className="border rounded p-2 cursor-pointer"
              >
                delete
              </button>
              <button
                onClick={() => handleUpdateTodo(item)}
                className="border rounded p-2 cursor-pointer"
              >
                update
              </button>
            </li>
          ))}
      </ul>
      <div>
        <button onClick={handleFetchFromApi} className="border rounded p-2 cursor-pointer">
          Fetch from Api
        </button>
        {
          todoFromApi && todoFromApi.map((item) => (
            <p key={item.id}>{item.todo}</p>
          ))
        }
      </div>
    </div>
  );
}
