import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { GameContext } from "../context/GameContext";

const useStyles = makeStyles({
  scoreBar: {
    "& h3": {
      fontFamily: 'Bilbo',
      fontSize: "2.3rem",
      textAlign: "center",
      letterSpacing: 4,
      fontWeight: "bold",
      margin: 0,
      color: "gold",

      "& span": {
        color: "greenyellow",
        fontSize: "3.5rem",
      },
    },
  },
});

function ScoreBar() {
  const {
    scoreState: { score },
  } = useContext(GameContext);
  const classes = useStyles();
  return (
    <div className={classes.scoreBar}>
      <h3>
        Images clicked: <span>{score}</span>
      </h3>
    </div>
  );
}

export default ScoreBar;
