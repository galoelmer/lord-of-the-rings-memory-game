import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { useTransition, animated } from "@react-spring/web";
import useMeasure from "react-use-measure";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useGameContext } from "@/context";
import styles from "./playground.module.css";
import type { CharacterInfo } from "@/context/types";

const Playground = () => {
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);
  const [ref, { width }] = useMeasure();
  const mobileSize = useMediaQuery("(max-width:600px)");
  const {
    charactersList,
    displayPlayground,
    setCharacterName,
    shuffleCharactersList,
    setScore,
    setOpenModal,
    setChallengeComplete,
  } = useGameContext();

  const columns = mobileSize ? 3 : 4;

  // Form a grid of stacked items using width & columns
  const [heights, gridItems] = useMemo(() => {
    let heights = new Array(columns).fill(0);
    let gridItems = charactersList.map((child) => {
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
  }, [columns, charactersList, width]);

  // Turn the static grid values into animated transitions, any addition, removal or change will be animated
  const transitions = useTransition(gridItems, {
    key: (item: CharacterInfo) => item.image,
    from: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 0 }),
    enter: ({ x, y, width, height }) => ({ x, y, width, height, opacity: 1 }),
    update: ({ x, y, width, height }) => ({ x, y, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  });

  const handleClick = (key: CharacterInfo["key"]) => {
    if (selectedCharacters.includes(key)) {
      const character = charactersList.find((item) => item.key === key);
      if (character) {
        setCharacterName(character.name);
        setOpenModal(true);
      }
      setScore(0);
      setSelectedCharacters([]);
    } else {
      setSelectedCharacters((prevState) => [key, ...prevState]);
    }
    shuffleCharactersList();
  };

  useEffect(() => {
    setScore(selectedCharacters.length);
    if (selectedCharacters.length === 12) {
      setSelectedCharacters([]);
      setChallengeComplete(true);
      setOpenModal(true);
    }
  }, [selectedCharacters.length, setChallengeComplete, setOpenModal, setScore]);

  if (!displayPlayground) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={styles.container}
      style={{ height: Math.max(...heights) }}
    >
      {transitions((style, item) => {
        return (
          <animated.div
            key={item.key}
            onClick={() => handleClick(item.key)}
            className={styles["character-image-wrapper"]}
            style={style}
          >
            <div className={styles["character-image"]}>
              <Image fill src={item.image} alt={item.name} quality={100} />
            </div>
          </animated.div>
        );
      })}
    </div>
  );
};

export default Playground;
