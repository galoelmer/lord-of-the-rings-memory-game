import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import { GameContext } from "../context/GameContext";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ModalWindow = () => {
  const classes = useStyles();
  const {
    state: { openModal: open, isChallengeComplete, characterName },
    dispatch,
  } = useContext(GameContext);

  const handleClose = () => {
    dispatch({ type: "CLOSE_MODAL" });
    dispatch({ type: "RESET_CHALLENGE" });
    dispatch({ type: "REMOVE_CHARACTER_NAME" });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        disableBackdropClick
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {isChallengeComplete ? (
              <h2 id="transition-modal-title">Challenge Completed!!!</h2>
            ) : (
              <>
                <h2>Sorry!</h2>
                <p>{characterName} was clicked twice</p>
              </>
            )}
            <Button onClick={handleClose}>Play again</Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalWindow;
