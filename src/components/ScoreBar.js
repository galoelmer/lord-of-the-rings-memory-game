import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  scoreBar: {
    "& h3": {
      fontSize: "1.8rem",
      textAlign: "center",
      letterSpacing: 2,
      fontWeight: "bold",
      margin: 0,
      color: "gold",

      "& span": {
        color: "greenyellow",
        fontSize: "2rem",
      },
    },
  },
});

function ScoreBar({score}) {
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
