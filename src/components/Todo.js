import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { useContext } from "react";
import { HandlerContext } from "../contexts/HandlerContext";

export default function Todo({ todo, Delete, Update }) {
  const { completeContext } = useContext(HandlerContext);
  return (
    <>
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
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                  fontWeight: "bold",
                  color: "#FFFFFF", // white for title
                }}
              >
                {todo.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                  fontStyle: "italic",
                  color: "#c2c1c1ff", // a lighter color for details
                }}
              >
                {todo.details}
              </Typography>
            </Grid>
            {/*===== TODO CONTENT =====*/}
            {/*ACTIONS*/}
            <Grid
              className="buttons"
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/*==============Complete button==========*/}
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
              {/*==============Complete button==========*/}

              {/*==============Update button==========*/}
              <IconButton
                className="icon-button"
                style={{
                  backgroundColor: "white",
                  color: "#3785ceff",
                  border: "solid #3785ceff 3px",
                }}
                onClick={() => {
                  Update(todo);
                }}
              >
                <EditIcon />
              </IconButton>
              {/*==============Update button==========*/}

              {/*==============Delete button==========*/}
              <IconButton
                className="icon-button"
                style={{
                  backgroundColor: "white",
                  color: "#d32e2eff",
                  border: "solid #d32e2eff 3px",
                }}
                onClick={() => {
                  Delete(todo.id);
                }}
              >
                <DeleteOutlineIcon />
              </IconButton>
              {/*==============Delete button==========*/}
            </Grid>
            {/*===== ACTIONS =====*/}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
