import React, { useEffect, useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";
import { GameContext } from "../context/GameContext";
import imagesList from "../imagesUrl";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Bilbo",
    fontSize: "1.5em",
    letterSpacing: 3,
    textAlign: "center",
    minWidth: 320,

    "& h2": {
      fontSize: "2em",
      margin: 0,
      color: "#fff",
    },
  },
  paper: {
    // backgroundColor: theme.palette.background.paper,
    background: `linear-gradient(
      135deg,
      rgba(2, 0, 36, 0.9318277652858018) 0%,
      rgba(10, 25, 54, 0.8321078773306197) 48%,
      rgba(52, 124, 182, 0.834908997778799) 100%
    )`,
    boxShadow: theme.shadows[8],
    padding: theme.spacing(2, 4, 3),
    borderRadius: 15,
    outline: "none",
  },
  characterName: {
    fontSize: "1.1em",
    fontWeight: "bold",
    color: "#fff",

    "& span": {
      color: "greenyellow",
    },
  },
  button: {
    fontFamily: "Bilbo",
    fontSize: "0.8em",
    fontWeight: "bold",
    marginTop: 20,
  },
  popover: {
    pointerEvents: "none",
    cursor: "pointer",

    "& img": {
      borderRadius: 10,
    },
  },
}));

const ModalWindow = () => {
  const classes = useStyles();
  const [imageSrc, setImageSrc] = useState(null);
  const {
    scoreState: { openModal: open, isChallengeComplete, characterName },
    scoreDispatch,
    listDispatch,
  } = useContext(GameContext);

  const handleClose = () => {
    listDispatch({type: "RESET_IMAGES_LIST"});
    scoreDispatch({ type: "CLOSE_MODAL" });
    scoreDispatch({ type: "RESET_CHALLENGE" });
    scoreDispatch({ type: "REMOVE_CHARACTER_NAME" });
  };

  useEffect(() => {
    const imageSrc = imagesList.find((image) => image.name === characterName);
    setImageSrc(imageSrc?.image);
  }, [characterName]);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        closeAfterTransition
        disableBackdropClick
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {isChallengeComplete ? (
              <h2 id="transition-modal-title">Challenge Completed!!!</h2>
            ) : (
              <>
                <h2>Sorry!</h2>
                <p className={classes.characterName}>
                  <Popover
                    className={classes.popover}
                    open={openPopover}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: 18,
                    }}
                    transformOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    onClose={handlePopoverClose}
                    elevation={8}
                    disableRestoreFocus
                  >
                    <img
                      src={imageSrc}
                      alt={characterName}
                      style={{ width: 80 }}
                    />
                  </Popover>
                  <span
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                  >
                    {characterName + " "}
                  </span>
                  was clicked twice
                </p>
              </>
            )}
            <Button
              className={classes.button}
              onClick={handleClose}
              variant="contained"
              color="primary"
            >
              Play again
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalWindow;
