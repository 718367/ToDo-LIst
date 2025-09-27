/* eslint-disable eqeqeq */

// React
import { useState, useEffect, useMemo, useReducer } from "react";

// External Libraries
//import { v4 as uuidv4 } from "uuid";

// MUI Components
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

// Internal Components
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";
import Todo from "./Todo";
import MySnackBar from "./MySnackBar";

// Context
import { HandlerContext } from "../contexts/HandlerContext";

// Fuctions
import addReducer from "../Reducers/AddReducer";
// const initialTodos = [
//   {
//     id: `${uuidv4()}`,
//     title: "المهمة الاولى ",
//     details: "التفاصيل الخاصة بالمهمة الاولى ",
//     isCompleted: false,
//   },
//   {
//     id: `${uuidv4()}`,
//     title: "المهمة الثانية ",
//     details: "التفاصيل الخاصة بالمهمة الثانية ",
//     isCompleted: false,
//   },
//   {
//     id: `${uuidv4()}`,
//     title: "المهمة الثالثة ",
//     details: "التفاصيل الخاصة بالمهمة الثالثة ",
//     isCompleted: false,
//   },
// ];

export default function TodoList() {
  //Reducers
  const [todos, dispach] = useReducer(addReducer, []);
  // Todos
  const [todoTitle, setTodoTitle] = useState("");
  const [todoId, setTodoId] = useState();
  const [todo, setTodo] = useState();
  const [todosFilter, setTodosFilter] = useState(0);

  // Modals
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  // Snackbar
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snckBarMessage, setSnckBarMessage] = useState("");

  function Delete(id) {
    setTodoId(id);
    setDeleteModal(true);
  }
  function Update(todo) {
    setTodo(todo);
    setUpdateModal(true);
  }

  useEffect(() => {
    dispach({ type: "reload" });
    console.log("Hello World from TodoList useEffect !! ");
  }, []);

  function handelInputChange(value) {
    setTodoTitle(value);
  }

  function handelCompleteClick(todoId) {
    dispach({ type: "complete", payload: { id: todoId } });
  }

  function handelAddEvent() {
    if (todoTitle !== "") {
      dispach({ type: "add", payload: { newTitle: todoTitle } });
      setTodoTitle("");
    }
  }
  function handelDeleteClick(todoId) {
    dispach({ type: "delete", payload: { id: todoId } });
    setSnckBarMessage("TODO has been Deleted successfuly !");
    setOpenSnackBar(true);
  }
  function handelUpdateClick(todoId, newTitle, newDetails) {
    if (newTitle !== "" && newDetails !== "") {
      dispach({
        type: "update",
        payload: { id: todoId, newTitle: newTitle, newDetails: newDetails },
      });
      setSnckBarMessage("TODO has been Updated successfuly !");
      setOpenSnackBar(true);
    }
  }

  const todosToBeRendered = useMemo(() => {
    if (todosFilter === 1) return todos.filter((t) => t.isCompleted);
    if (todosFilter === 2) return todos.filter((t) => !t.isCompleted);
    return todos;
  }, [todos, todosFilter]);

  const todosJSX = todosToBeRendered.map((t) => (
    <Todo
      key={t.id}
      todo={t}
      handelCheck={handelCompleteClick}
      handelDelete={handelDeleteClick}
      Delete={Delete}
      Update={Update}
      setMessage={setSnckBarMessage}
      setSnackBar={setOpenSnackBar}
    />
  ));
  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          margin: 10,
        }}
      >
        <Card sx={{ borderRadius: 5}}>
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
              <DeleteModal
                deleteClicked={deleteModal}
                setDeleteClicked={setDeleteModal}
                id={todoId}
                setMessage={setSnckBarMessage}
                setSnackBar={setOpenSnackBar}
              />
              <UpdateModal
                updateClicked={updateModal}
                setUpdateClicked={setUpdateModal}
                todo={todo}
                setMessage={setSnckBarMessage}
                setSnackBar={setOpenSnackBar}
              />

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
                    setSnckBarMessage("TODO has been added successfuly !");
                    setOpenSnackBar(true);
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
      <MySnackBar
        getter={openSnackBar}
        setter={setOpenSnackBar}
        message={snckBarMessage}
      />
    </>
  );
}
