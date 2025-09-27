import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext, useEffect } from "react";
import { HandlerContext } from "../contexts/HandlerContext";

export default function UpdateModal({
  updateClicked,
  setUpdateClicked,
  todo,
  setMessage,
  setSnackBar,
}) {
  const [title, setTitle] = React.useState("");
  const [details, setDetails] = React.useState("");
  const { updateContext } = useContext(HandlerContext);

  const handleClose = () => {
    setUpdateClicked(false);
  };
  useEffect(() => {
    if (updateClicked && todo) {
      setTitle(todo.title);
      setDetails(todo.details);
    }
  }, [updateClicked, todo]);
  return (
    <>
      <Dialog
        sx={{ direction: "rtl" }}
        open={updateClicked}
        onClose={handleClose}
      >
        <DialogTitle>تعديل المهمة</DialogTitle>
        <DialogContent>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            required
            margin="dense"
            id="title"
            name="email"
            label="العنوان"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            autoFocus
            required
            margin="dense"
            id="details"
            name="details"
            label="تفاصبل المهمة"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "#3785ceff" }} onClick={handleClose}>
            إلغاء
          </Button>
          <Button
            sx={{ color: "#3785ceff" }}
            type="submit"
            form="subscription-form"
            onClick={() => {
              updateContext(todo.id, title, details);
              handleClose();
              setMessage(" TODO has been Updated successfuly!");
              setSnackBar(true);
            }}
          >
            تعديل
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
