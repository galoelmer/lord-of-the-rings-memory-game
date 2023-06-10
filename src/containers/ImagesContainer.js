import React, { useState, useEffect, useMemo, useContext } from "react";
import { useTransition, animated } from "@react-spring/web";
import useMeasure from "react-use-measure";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { GameContext } from "../context/GameContext";

const useStyles = makeStyles((theme) => ({
  list: {
    position: "relative",
    width: "100%",
    height: "100%",

    "& > div": {
      position: "absolute",
      filter: "brightness(1.15)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",

      "& > div": {
        position: "relative",
        width: "90%",
        height: "90%",
        overflow: "hidden",
        borderRadius: 10,
        boxShadow:
          "0 6px 6px rgba(0, 0, 0, 0.4), 2px 8px 8px rgba(0, 0, 0, 0.2)",
      },
    },
    [theme.breakpoints.up(768)]: {
      maxWidth: 760,
      margin: "0 auto",
    },
  },
}));

const ImagesContainer = () => {
  const [clickedImages, setClickedImages] = useState([]);

  const classes = useStyles();
  const [ref, { width }] = useMeasure();
  const mobileSize = useMediaQuery("(max-width:600px)");

  const {
    scoreDispatch,
    imagesList: { list },
    listDispatch,
  } = useContext(GameContext);

  const columns = mobileSize ? 3 : 4;

  // Form a grid of stacked items using width & columns
  const [heights, gridItems] = useMemo(() => {
    let heights = new Array(columns).fill(0);
    let gridItems = list.map((child) => {
      const column = heights.indexOf(Math.min(...heights));
      const x = (width / columns) * column;
      const y = (heights[column] += width / columns) - width / columns;
      return {
        ...child,
        x,
        y,
        width: width / columns,
        height: width / columns,
      };
    });
    return [heights, gridItems];
  }, [columns, list, width]);

  // Turn the static grid values into animated transitions, any addition, removal or change will be animated
  const transitions = useTransition(gridItems, {
    key: (item) => item.image,
    from: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 0 }),
    enter: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 1 }),
    update: ({ x, y, width, height }) => ({ x, y, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  });

  useEffect(() => {
    scoreDispatch({ type: "UPDATE_SCORE", payload: clickedImages.length });
    if (clickedImages.length === 12) {
      setClickedImages([]);
      scoreDispatch({ type: "SET_CHALLENGE_COMPLETE" });
      scoreDispatch({ type: "OPEN_MODAL" });
    }
  }, [clickedImages, scoreDispatch]);

  const handleClick = (key) => {
    if (!clickedImages.includes(key)) {
      setClickedImages((prevState) => [key, ...prevState]);
    } else {
      const character = list.find((item) => item.key === key);

      if (character) {
        scoreDispatch({ type: "SET_CHARACTER_NAME", payload: character.name });
        scoreDispatch({ type: "OPEN_MODAL" });
      }

      scoreDispatch({ type: "RESET_SCORE" });
      setClickedImages([]);
    }

    listDispatch({ type: "SHUFFLE_LIST_IMAGES" });
  };

  return (
    <div
      ref={ref}
      className={classes.list}
      style={{ height: Math.max(...heights) }}
    >
      {transitions((style, item) => {
        return (
          <animated.div
            key={item.key}
            style={{
              ...style,
              willChange: "transform, opacity, width, height",
            }}
            onClick={() => handleClick(item.key)}
          >
            <div
              style={{
                background: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center center",
              }}
            />
          </animated.div>
        );
      })}
    </div>
  );
};

export default ImagesContainer;
