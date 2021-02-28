import React, { useReducer } from "react";
import { scoreReducer } from "../reducers/scoreReducer";
import { imagesListReducer } from "../reducers/imagesListReducer";
import _shuffle from "lodash.shuffle";
import list from "../imagesUrl";

export const GameContext = React.createContext();

const scoreInitialState = {
  score: 0,
  openModal: false,
  isChallengeComplete: false,
  characterName: null,
};

const imagesListInitialState = {
  list: _shuffle(list).slice(0, 12),
};

const GameContextProvider = (props) => {
  const [scoreState, scoreDispatch] = useReducer(
    scoreReducer,
    scoreInitialState
  );
  const [imagesList, listDispatch] = useReducer(
    imagesListReducer,
    imagesListInitialState
  );

  return (
    <GameContext.Provider
      value={{ scoreState, scoreDispatch, imagesList, listDispatch }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
