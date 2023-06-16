import { MouseEvent, useEffect, useState, useCallback } from "react";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import MuiModal from "@mui/material/Modal";
import Popover from "@mui/material/Popover";
import Image from "next/image";
import { Bilbo_Swash_Caps } from "next/font/google";

import { useGameContext } from "@/context";

import styles from "./modal.module.css";

const bilbo = Bilbo_Swash_Caps({ weight: "400", subsets: ["latin"] });
console.log("TCL ▶︎ file: index.tsx:18 ▶︎ bilbo:", bilbo);

const Modal = () => {
  const [imageSrc, setImageSrc] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<HTMLSpanElement | null>(null);
  const {
    openModal,
    setOpenModal,
    isChallengeComplete,
    characterName,
    setScore,
    shuffleCharactersList,
    charactersList,
  } = useGameContext();

  const handleClose = useCallback(
    (e?: {}, reason?: "backdropClick" | "escapeKeyDown") => {
      if (reason !== "backdropClick") {
        shuffleCharactersList();
        setOpenModal(false);
        setScore(0);
      }
    },
    [setOpenModal, setScore, shuffleCharactersList]
  );

  const handlePopoverOpen = useCallback(
    (event: MouseEvent<HTMLSpanElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);

  useEffect(() => {
    const imageSrc = charactersList.find(
      (image) => image.name === characterName
    );
    setImageSrc(imageSrc?.image ?? "");
  }, [characterName, charactersList]);

  return (
    <div>
      <MuiModal open={openModal} onClose={handleClose} className={styles.modal}>
        <Fade in={openModal}>
          <div className={`${styles["modal__content"]}`} style={bilbo.style}>
            {isChallengeComplete ? (
              <h2 className={`${styles["modal__header"]}`}>
                Challenge Completed!
              </h2>
            ) : (
              <div>
                <h2 className={`${styles["modal__header"]}`}>Sorry!</h2>
                <p className={styles.modal__message}>
                  <span
                    aria-owns={openPopover ? "mouse-over-popover" : undefined}
                    aria-haspopup="true"
                    onMouseEnter={handlePopoverOpen}
                    onMouseLeave={handlePopoverClose}
                    className={styles["modal__character-name"]}
                  >
                    {characterName + " "}
                  </span>
                  was selected twice
                </p>
                <Popover
                  className={styles.popover}
                  id="mouse-over-popover"
                  open={openPopover}
                  anchorEl={anchorEl}
                  onClose={handlePopoverClose}
                  elevation={8}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: 18,
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  sx={{
                    pointerEvents: "none",
                  }}
                  slotProps={{
                    paper: {
                      style: {
                        backgroundColor: "transparent",
                      },
                    },
                  }}
                >
                  <Image
                    className={styles["popover__character-image"]}
                    src={imageSrc}
                    alt={characterName ?? ""}
                    width={80}
                    height={80}
                  />
                </Popover>
              </div>
            )}
            <Button
              className={styles["modal__button"]}
              onClick={() => handleClose()}
              variant="contained"
              color="primary"
            >
              Try again
            </Button>
          </div>
        </Fade>
      </MuiModal>
    </div>
  );
};

export default Modal;
