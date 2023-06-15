import { forwardRef } from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Zoom from "@mui/material/Zoom";
import { TransitionProps } from "@mui/material/transitions";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useGameContext } from "@/context";
import styles from "./intro-game.module.css";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Zoom in ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(() => ({
  "& .MuiDialog-paper": {
    background: "none",
    boxShadow: "none",
    overflow: "hidden",
    margin: 0,
    minWidth: 320,
  },
  "& .MuiDialogActions-root": {
    justifyContent: "center",
  },
}));

export default function IntroGame() {
  const { displayPlayground, setDisplayPlayground } = useGameContext();

  const isMobileLarge = useMediaQuery("(max-width:600px)");
  const isMobileMedium = useMediaQuery("(max-width:400px)");
  const isMobileSmall = useMediaQuery("(max-width:330px)");

  const handleClose = () => {
    setDisplayPlayground(true);
  };

  return (
    <BootstrapDialog
      open={!displayPlayground}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <DialogContent
        style={{
          maxHeight: "100%",
          position: "relative",
          width: isMobileSmall
            ? 270
            : isMobileMedium
            ? 320
            : isMobileLarge
            ? 370
            : 500,
          height: isMobileSmall
            ? 250
            : isMobileMedium
            ? 300
            : isMobileLarge
            ? 350
            : 450,
        }}
      >
        <Image
          fill
          priority
          sizes="(max-width:330px) 330px, (max-width:400px) 400px, (max-width:600px) 600px, 500px"
          src="/images/intro_image.png"
          style={{ objectFit: "contain" }}
          quality={100}
          alt="Game intro"
        />
      </DialogContent>
      <DialogActions style={{ marginTop: 40 }}>
        <Button className={styles.playButton} onClick={handleClose}>
          <Image
            src="/images/play_button.png"
            width={130}
            height={45}
            sizes=""
            alt="Play button"
          />
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
}
