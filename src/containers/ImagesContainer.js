import React, { useState, useEffect, useMemo, useContext } from "react";
import { useTransition, a } from "react-spring";
import useMeasure from "../hooks/useMeasure";
import _shuffle from "lodash.shuffle";
import list from "../imagesUrl";
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
      "& > img": {
        width: "90%",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
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
  const mobileSize = useMediaQuery("(max-width:600px)");
  const classes = useStyles();
  const [imagesList, updateImagesList] = useState(_shuffle(list));
  const [clickedImages, setClickedImages] = useState([]);
  const columns = mobileSize ? 3 : 4;
  const [bind, { width }] = useMeasure();
  const { dispatch } = useContext(GameContext);

  const [heights, gridItems] = useMemo(() => {
    let heights = new Array(columns).fill(0);
    let gridItems = imagesList.map((child) => {
      const column = heights.indexOf(Math.min(...heights));
      const xy = [
        (width / columns) * column,
        (heights[column] += width / columns) - width / columns,
      ];
      return {
        ...child,
        xy,
        width: width / columns,
        height: width / columns,
      };
    });
    return [heights, gridItems];
  }, [columns, imagesList, width]);

  const transitions = useTransition(gridItems, (item) => item.image, {
    from: ({ xy, width, height }) => ({ xy, width, height, opacity: 0 }),
    enter: ({ xy, width, height }) => ({ xy, width, height, opacity: 1 }),
    update: ({ xy, width, height }) => ({ xy, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  });

  useEffect(() => {
    dispatch({ type: "UPDATE_SCORE", payload: clickedImages.length });
    if (clickedImages.length === 12) {
      setClickedImages([]);
      dispatch({ type: "SET_CHALLENGE_COMPLETE" });
      dispatch({ type: "OPEN_MODAL" });
    }
    /**
     *  Cheat console log
     */
    // const imagesClicked = list
    //   .filter((x) => clickedImages.includes(x.key))
    //   .map((y) => y.name);
    // console.log(imagesClicked);
  }, [clickedImages, dispatch]);

  /**
   * Score update after clicking images
   */
  const handleClick = (key) => {
    if (!clickedImages.includes(key)) {
      setClickedImages((prevState) => [key, ...prevState]);
    } else {
      // Find character's name with a doubled click
      // setDoubleClickImage(() => {
      //   return list.find((item) => item.key === key).name;
      // });
      const characterName = list.find((item) => item.key === key).name;
      dispatch({ type: "SET_CHARACTER_NAME", payload: characterName });
      dispatch({ type: "OPEN_MODAL" });
      dispatch({ type: "RESET_SCORE" });
      setClickedImages([]);
    }
    updateImagesList(_shuffle(list));
  };

  return (
    <>
      <div
        {...bind}
        className={classes.list}
        style={{ height: Math.max(...heights) }}
      >
        {transitions.map(({ item, props: { xy, ...rest }, key }) => {
          return (
            <a.div
              key={key}
              style={{
                transform: xy.interpolate(
                  (x, y) => `translate3d(${x}px,${y}px,0)`
                ),
                ...rest,
              }}
              onClick={() => handleClick(item.key)}
            >
              <img src={item.image} alt={item.image} />
            </a.div>
          );
        })}
      </div>
    </>
  );
};

export default ImagesContainer;
