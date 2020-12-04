import React, { useState, useMemo } from "react";
import { useTransition, a } from "react-spring";
import useMeasure from "../hooks/useMeasure";
import _shuffle from "lodash.shuffle";
import list from "../imagesUrl";
import { makeStyles } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

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
      margin: '0 auto',
    },
  },
}));

const ImagesContainer = () => {
  const mobileSize = useMediaQuery("(max-width:600px)");
  const classes = useStyles();
  const [imagesList, updateImagesList] = useState(_shuffle(list));
  const columns = mobileSize ? 3 : 4;
  const [bind, { width }] = useMeasure();

  const [heights, gridItems] = useMemo(() => {
    let heights = new Array(columns).fill(0);
    let gridItems = imagesList.map((child) => {
      const column = heights.indexOf(Math.min(...heights));
      console.log(width);
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
  console.log(heights);

  const transitions = useTransition(gridItems, (item) => item.image, {
    from: ({ xy, width, height }) => ({ xy, width, height, opacity: 0 }),
    enter: ({ xy, width, height }) => ({ xy, width, height, opacity: 1 }),
    update: ({ xy, width, height }) => ({ xy, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  });

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
              onClick={() => updateImagesList(_shuffle(list))}
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
