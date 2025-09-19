/* eslint-disable eqeqeq */
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import Todo from "./Todo";
import { HandlerContext } from "../contexts/HandlerContext";

import { v4 as uuidv4 } from "uuid";

const initialTodos = [
  {
    id: `${uuidv4()}`,
    title: "المهمة الاولى ",
    details: "التفاصيل الخاصة بالمهمة الاولى ",
    isCompleted: false,
  },
  {
    id: `${uuidv4()}`,
    title: "المهمة الثانية ",
    details: "التفاصيل الخاصة بالمهمة الثانية ",
    isCompleted: false,
  },
  {
    id: `${uuidv4()}`,
    title: "المهمة الثالثة ",
    details: "التفاصيل الخاصة بالمهمة الثالثة ",
    isCompleted: false,
  },
];

export default function TodoList() {
  const [todosFilter, setTodosFilter] = useState(0);
  const [todos, setTodos] = useState(initialTodos);
  const [todoTitle, setTodoTitle] = useState("");

  useEffect(() => {
    console.log("Hello World from TodoList useEffect !! ");
    const localStorageTodos = JSON.parse(localStorage.getItem("todos"));
    setTodos(localStorageTodos);
  }, []);

  function handelAddEvent() {
    if (todoTitle !== "") {
      const newTodo = {
        id: `${uuidv4()}`,
        title: todoTitle,
        details: "",
        isCompleted: false,
      };
      const updatedTodos = [...todos, newTodo];
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setTodos(updatedTodos);
      setTodoTitle("");
    }
  }

  function handelInputChange(value) {
    setTodoTitle(value);
  }

  function handelCompleteClick(todoId) {
    const updatedTodos = todos.map((t) => {
      if (t.id === todoId) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handelDeleteClick(todoId) {
    const updatedTodos = todos.filter((t) => t.id !== todoId);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  function handelUpdateClick(todoId, newTitle, newDetails) {
    if (newTitle !== "" && newDetails !== "") {
      const updatedTodos = todos.map((t) => {
        if (t.id === todoId) {
          return {
            ...t,
            title: newTitle,
            details: newDetails,
          };
        }
        return t;
      });
      setTodos(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  }
  // eslint-disable-next-line array-callback-return
  const todosJSX = todos.map((t) => {
    if (todosFilter == 2) {
      if (t.isCompleted === 0) {
        return (
          <Todo
            key={t.id}
            todo={t}
            handelCheck={handelCompleteClick}
            handelDelete={handelDeleteClick}
          />
        );
      }
    } else if (todosFilter === 1) {
      if (t.isCompleted === 1) {
        return (
          <Todo
            key={t.id}
            todo={t}
            handelCheck={handelCompleteClick}
            handelDelete={handelDeleteClick}
          />
        );
      }
    } else {
      return (
        <Todo
          key={t.id}
          todo={t}
          handelCheck={handelCompleteClick}
          handelDelete={handelDeleteClick}
        />
      );
    }
  });
  return (
    <Container
      maxWidth="lg"
      sx={{
        margin: 10,
      }}
    >
      <Card sx={{ borderRadius: 5, padding: 5 }}>
        <CardContent>
          <Typography variant="h2" sx={{ fontWeight: "700", padding: 3 }}>
            مهامي
          </Typography>
          <Divider sx={{ width: "80%", margin: "auto" }} />

          {/*FILTER BUTTONS*/}
          <ToggleButtonGroup
            style={{ direction: "ltr", marginTop: "30px" }}
            value={todosFilter}
            exclusive
            //onChange={handleAlignment}
            aria-label="text alignment"
            color="primary"
          >
            <ToggleButton
              onClick={() => {
                setTodosFilter(0);
              }}
              value={0}
              aria-label="left aligned"
            >
              الكل
            </ToggleButton>
            <ToggleButton
              onClick={() => {
                setTodosFilter(1);
              }}
              value={1}
              aria-label="centered"
            >
              المنجز
            </ToggleButton>
            <ToggleButton
              onClick={() => {
                setTodosFilter(2);
              }}
              value={2}
              aria-label="right aligned"
            >
              غير المنجز
            </ToggleButton>
          </ToggleButtonGroup>
          {/*======FILTER BUTTONS======*/}

          {/*ALL TODOS*/}
          <HandlerContext.Provider
            value={{
              completeContext: handelCompleteClick,
              deleteContext: handelDeleteClick,
              updateContext: handelUpdateClick,
            }}
          >
            {todosJSX}
          </HandlerContext.Provider>

          {/* ====ALL TODOS====*/}
          <Divider sx={{ marginTop: 5, marginBottom: 5 }} />
          <Grid style={{}} container spacing={2}>
            <Grid style={{}} size={8}>
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="تفاصيل المهمة"
                variant="outlined"
                onChange={(e) => {
                  handelInputChange(e.target.value);
                }}
                value={todoTitle}
              />
            </Grid>
            <Grid style={{}} size={4}>
              <Button
                className="add-btn"
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "primary",
                }}
                variant="contained"
                onClick={() => {
                  handelAddEvent();
                }}
                disabled={todoTitle === ""}
              >
                إضافة
              </Button>
            </Grid>
          </Grid>
          {/*ADD BUTTON + TODO DESCRIBTION*/}
        </CardContent>
      </Card>
    </Container>
  );
}
