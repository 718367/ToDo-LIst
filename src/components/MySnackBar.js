import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function MySnackBar({ getter, setter, message }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setter(false);
  };

  return (
    <>
      <Snackbar open={getter} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
