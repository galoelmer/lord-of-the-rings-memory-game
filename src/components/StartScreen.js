import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  dialog: {
    border: "5px solid red",
    "& div > *": {
      color: "#fff",
    },
    "& > div > div": {
      background: `linear-gradient(135deg,
      rgba(2, 0, 36, 0.7318277652858018) 0%,
      rgba(10, 25, 54, 0.8521078773306197) 48%,
      rgba(52, 124, 182, 0.85908997778799) 100%
      )`,
      boxShadow: '3px 3px 10px 6px rgba(0,0,0,0.3)',   
    },
  },
  gameTitle: {
    fontFamily: 'Bilbo', 
  }
});

export default function AlertDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick
        className={classes.dialog}
      >
        <DialogTitle className={classes.gameTitle}>
          {"Lord of the Rings Memory Challenge"}
        </DialogTitle>
        <DialogContent className={classes.content}>
          <DialogContentText id="alert-dialog-description">
            Click on an image until all 12 images are clicked, but don't click on
            any more than once!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Play
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
