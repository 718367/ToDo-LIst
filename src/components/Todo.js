import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteModal from "./DeleteModal";
import UpdateModal from "./UpdateModal";
import { useState, useContext } from "react";
import { HandlerContext } from "../contexts/HandlerContext";

export default function Todo({ todo }) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const { completeContext } = useContext(HandlerContext);
  return (
    <>
      <DeleteModal
        deleteClicked={deleteModal}
        setDeleteClicked={setDeleteModal}
        id={todo.id}
      />
      <UpdateModal
        updateClicked={updateModal}
        setUpdateClicked={setUpdateModal}
        todo={todo}
      />
      <Card
        className="todo-card"
        sx={{
          minWidth: 275,
          backgroundColor: todo.isCompleted ? "#414a96ff" : "#283593",
          opacity: todo.isCompleted ? 0.8 : 1,
          color: "white",
          marginTop: 4,
          border: 2,
          borderColor: "black",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            {/*TODO CONTENT */}
            <Grid size={8} style={{}}>
              <Typography
                variant="h5"
                style={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}{" "}
              </Typography>
              <Typography
                variant="h6"
                style={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.details}
              </Typography>
            </Grid>
            {/*===== TODO CONTENT =====*/}
            {/*ACTIONS*/}
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <IconButton
                className="icon-button"
                style={{
                  backgroundColor: todo.isCompleted ? "#00d81dff" : "white",
                  color: todo.isCompleted ? "white" : "#35cf4aff",
                  border: todo.isCompleted ? "white" : "solid #35cf4aff 3px",
                }}
                onClick={() => {
                  completeContext(todo.id);
                }}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                className="icon-button"
                style={{
                  backgroundColor: "white",
                  color: "#3785ceff",
                  border: "solid #3785ceff 3px",
                }}
                onClick={() => {
                  setUpdateModal(true);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                className="icon-button"
                style={{
                  backgroundColor: "white",
                  color: "#d32e2eff",
                  border: "solid #d32e2eff 3px",
                }}
                onClick={() => {
                  setDeleteModal(true);
                }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            </Grid>
            {/*===== ACTIONS =====*/}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
