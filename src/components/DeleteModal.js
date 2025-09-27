import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { HandlerContext } from "../contexts/HandlerContext";
export default function DeleteModal({
  deleteClicked,
  setDeleteClicked,
  id,
  setMessage,
  setSnackBar,
}) {
  const { deleteContext } = useContext(HandlerContext);
  const handleClose = () => {
    setDeleteClicked(false);
  };

  return (
    <React.Fragment>
      <Dialog
        sx={{ direction: "rtl" }}
        open={deleteClicked}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"هل انت متأكد من  رغبتك في حذف هذة المهمة؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكن التراجع عن هذا الحذف في حال ختيار زر (حذف)
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "#d32e2eff" }} onClick={handleClose}>
            إغلاق
          </Button>
          <Button
            sx={{ color: "#d32e2eff" }}
            onClick={() => {
              deleteContext(id);
              setDeleteClicked(false);
              setMessage(" TODO has been deleted successfuly !");
              setSnackBar(true);
            }}
            autoFocus
          >
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
