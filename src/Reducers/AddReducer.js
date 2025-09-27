// External Libraries
import { v4 as uuidv4 } from "uuid";

export default function addReducer(currentTodos, action) {
  switch (action.type) {
    case "add": {
      const newTodo = {
        id: uuidv4(),
        title: action.payload.newTitle,
        details: "",
        isCompleted: false,
      };
      const updatedTodos = [...currentTodos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "delete": {
      const updatedTodos = currentTodos.filter(
        (t) => t.id !== action.payload.id
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "update": {
      const updatedTodos = currentTodos.map((t) => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            title: action.payload.newTitle,
            details: action.payload.newDetails,
          };
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "complete": {
      const updatedTodos = currentTodos.map((t) =>
        t.id === action.payload.id ? { ...t, isCompleted: !t.isCompleted } : t
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case "reload": {
      const localStorageTodos = JSON.parse(localStorage.getItem("todos"));
      if (localStorageTodos) {
        console.log("local storage todos loaded.");
        return localStorageTodos;
      } else {
        console.log("no todos in local storage");
        return [];
      }
    }
    default: {
      throw Error("Unknown action type: " + action.type);
    }
  }
}
