import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import introImage from "../assets/images/intro_image.png";
import playButtonImage from "../assets/images/play_button.png";

const useStyles = makeStyles({
  introImage: {
    width: "100%",
    height: "100%",
  },
  playButton: {
    padding: "25px",
    width: 150,
    boxShadow: "0 2px 6px rgba(0,0,0,0.22), 0 4px 8px rgba(0,0,0,0.12)",
    borderRadius: 25,
    background: "linear-gradient(to right, #1b0601, #2e0b01)",
    "&:hover": {
      background: "linear-gradient(to right, #1b0601, #410f01)",
    },
  },
});

// Override Material-UI default styles
const GlobalCss = withStyles({
  "@global": {
    ".MuiBackdrop-root": {
      background: "linear-gradient(to bottom, #141414, #474a62)",
    },
    ".MuiPaper-root": {
      background: "none",
      boxShadow: "none",
    },
    ".MuiDialog-paperWidthSm": {
      maxWidth: "100%",
    },
    ".MuiDialogActions-root": {
      justifyContent: "center",
    },
  },
})(() => null);

export default function AlertDialog() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <GlobalCss />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        disableBackdropClick
      >
        <img className={classes.introImage} src={introImage} alt="Intro" />
        <DialogActions>
          <Button className={classes.playButton} onClick={handleClose}>
            <img
              src={playButtonImage}
              style={{ width: "100%" }}
              alt="Play button"
            />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
