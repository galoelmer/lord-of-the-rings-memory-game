import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import introImage from "../assets/images/intro_image.png";
import playButtonImage from "../assets/images/play_button.png";
import backgroundImage from "../assets/images/background.jpg";

const useStyles = makeStyles({
  dialog: {
    overflowY: "scroll",
  },
  dialogContent: {
    maxHeight: "100%",
  },
  introImage: {
    width: "100%",
    height: "100%",
    minWidth: 230,
  },
  playButton: {
    padding: "25px",
    width: 150,
    boxShadow:
      "0 2px 6px rgba(35,141,157, 0.22), 0 4px 8px rgba(35,141,157, 0.12)",
    borderRadius: 15,
    background: "linear-gradient(to right, #0d131b, #1a2636)",
    "&:hover": {
      filter: "hue-rotate(60deg)",
    },
    opacity: 0.95,
  },
});

// Override Material-UI default styles
const GlobalCss = withStyles({
  "@global": {
    ".MuiBackdrop-root": {
      background: `linear-gradient(
      135deg,
      rgba(2, 0, 36, 0.7318277652858018) 0%,
      rgba(10, 25, 54, 0.4321078773306197) 48%,
      rgba(52, 124, 182, 0.434908997778799) 100%
    ), url(${backgroundImage})`,
      backgroundSize: "cover",
      height: "100%",
    },
    ".MuiPaper-root": {
      background: "none",
      boxShadow: "none",
      margin: 0,
      minWidth: 320,
      overflowY: "visible",
    },
    ".MuiDialog-paperWidthSm": {
      // maxWidth: "100%",
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
        className={classes.dialog}
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
