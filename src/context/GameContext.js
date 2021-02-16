import React, { useReducer } from "react";
import { scoreReducer } from "../reducers/scoreReducer";

export const GameContext = React.createContext();

const initialState = {
  score: 0,
  openModal: false,
  isChallengeComplete: false,
  characterName: null,
};

const GameContextProvider = (props) => {
  const [state, dispatch] = useReducer(scoreReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {props.children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
