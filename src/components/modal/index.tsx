import { useCallback } from "react";
import Image from "next/image";
import { Bilbo_Swash_Caps } from "next/font/google";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import MuiModal from "@mui/material/Modal";

import Confetti from "./confetti";
import { useGameContext } from "@/context";

import styles from "./modal.module.css";

const bilbo = Bilbo_Swash_Caps({ weight: "400", subsets: ["latin"] });

const Modal = () => {
  const {
    characterName,
    isChallengeComplete,
    openModal,
    resetGame,
    setDisplayPlayground,
  } = useGameContext();

  const handleClose = useCallback(
    (e?: {}, reason?: "backdropClick" | "escapeKeyDown") => {
      if (reason !== "backdropClick") {
        resetGame();
      }
    },
    [resetGame]
  );

  const handleResetGame = useCallback(
    (e?: {}, reason?: "backdropClick" | "escapeKeyDown") => {
      if (reason !== "backdropClick") {
        resetGame();
        setDisplayPlayground(false);
      }
    },
    [resetGame, setDisplayPlayground]
  );

  return (
    <div>
      {isChallengeComplete && <Confetti />}
      <MuiModal open={openModal} onClose={handleClose} className={styles.modal}>
        <Fade in={openModal}>
          <div className={`${styles["modal__content"]}`} style={bilbo.style}>
            <div className={`${styles["modal__content-background"]}`}>
              <Image
                fill
                alt="gandalf by the fire"
                style={{ filter: "hue-rotate(180deg)" }}
                src={
                  isChallengeComplete
                    ? "/images/modal_image_success.jpeg"
                    : "/images/modal_image_error.png"
                }
              />
              <div className={styles.message_container}>
                <h2 className={`${styles["modal__header"]}`}>
                  {isChallengeComplete ? "Well Done!" : "Oh no..."}
                </h2>
                {!isChallengeComplete && (
                  <p className={styles.modal__message}>
                    <span className={styles["modal__character-name"]}>
                      {characterName + " "}
                    </span>
                    was selected twice
                  </p>
                )}
              </div>
            </div>
            <div className={styles.modal__footer}>
              <p>Try Again?</p>
              <Button
                className={styles["modal__button"]}
                onClick={() => handleClose()}
                variant="contained"
                color="primary"
              >
                Yes
              </Button>
              <Button
                className={styles["modal__button"]}
                onClick={() => handleResetGame()}
                variant="contained"
                color="primary"
              >
                No
              </Button>
            </div>
          </div>
        </Fade>
      </MuiModal>
    </div>
  );
};

export default Modal;
