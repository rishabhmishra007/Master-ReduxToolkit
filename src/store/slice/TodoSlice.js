import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk("fetchTodo", async () => {
  const apiRes = await fetch("https://dummyjson.com/todos");
  const result = await apiRes.json();

  return result;
});

// export const fetchTodosAndUsers = createAsyncThunk(
//   "fetchTodosAndUsers",
//   async () => {
//     const [todosRes, usersRes] = await Promise.all([
//       fetch("https://dummyjson.com/todos"),
//       fetch("https://dummyjson.com/users"),
//     ]);
//     const todos = await todosRes.json();
//     const users = await usersRes.json();

//     // Combine or return separately as needed
//     return { todos: todos.todos, users: users.users };
//   }
// );

const initialState = {
  todoList: [],
  loading: false,
  todoFromApi: [],
  // usersFromApi: [], // add this for users
  isError: false,
};

const todoReducer = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newCreatedTodo = {
        id: new Date().getTime(),
        title: action.payload, // action.payload contains the info that we send from component via dispatch hook.
      };

      state.todoList.push(newCreatedTodo);

      return state;
    },
    deleteTodo: (state, action) => {
      // console.log(action);
      state.todoList = state.todoList.filter(
        (todo) => todo.id !== action.payload
      );

      return state;
    },
    updateTodo: (state, action) => {
      // console.log(action);
      let getTodos = state.todoList;
      let currTodoIndex = getTodos.findIndex(
        (item) => item.id === action.payload.currEditTodoId
      );

      getTodos[currTodoIndex] = {
        ...getTodos[currTodoIndex],
        title: action.payload.currentTodo,
      };
      // better way : -

      // const idx = state.todoList.findIndex(
      //   (item) => item.id === action.payload.currEditTodoId
      // );
      // if (idx !== -1) {
      //   state.todoList[idx].title = action.payload.currentTodo;
      // }

      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      console.log(action.payload);

      state.loading = false; 
      state.todoFromApi = action.payload.todos;
      // state.usersFromApi = action.payload.users;
    });

    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
    });
  },
});

export const { addTodo, deleteTodo, updateTodo } = todoReducer.actions;
export default todoReducer.reducer;
