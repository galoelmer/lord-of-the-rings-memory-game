import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";
import _shuffle from "lodash.shuffle";

import charactersList from "./charactersList";
import reducer from "./reducer";

import { IGameContext, CharacterInfo } from "./types";

const initialState = {
  score: 0,
  setScore: (score: number) => {},
  openModal: false,
  setOpenModal: (openModal: boolean) => {},
  isChallengeComplete: false,
  setChallengeComplete: (isChallengeComplete: boolean) => {},
  characterName: null,
  setCharacterName: (characterName: string | null) => {},
  charactersList: _shuffle(charactersList).slice(0, 12),
  setCharactersList: (charactersList: CharacterInfo[]) => {},
  displayPlayground: false,
  setDisplayPlayground: (displayPlayground: boolean) => {},
  shuffleCharactersList: () => {},
};

export const GameContext = createContext<IGameContext>(initialState);
export const useGameContext = () => useContext(GameContext);

const GameContextProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const score = useMemo(() => state.score, [state.score]);
  const openModal = useMemo(() => state.openModal, [state.openModal]);

  const displayPlayground = useMemo(
    () => state.displayPlayground,
    [state.displayPlayground]
  );

  const isChallengeComplete = useMemo(
    () => state.isChallengeComplete,
    [state.isChallengeComplete]
  );

  const characterName = useMemo(
    () => state.characterName,
    [state.characterName]
  );

  const charactersList = useMemo(
    () => state.charactersList,
    [state.charactersList]
  );

  const setScore = useCallback((score: number) => {
    dispatch({ type: "SET_SCORE", payload: score });
  }, []);

  const setOpenModal = useCallback((openModal: boolean) => {
    dispatch({ type: "SET_OPEN_MODAL", payload: openModal });
  }, []);

  const setChallengeComplete = useCallback((isChallengeComplete: boolean) => {
    dispatch({
      type: "SET_CHALLENGE_COMPLETE",
      payload: isChallengeComplete,
    });
  }, []);

  const setCharacterName = useCallback((characterName: string | null) => {
    dispatch({ type: "SET_CHARACTER_NAME", payload: characterName });
  }, []);

  const setCharactersList = useCallback((charactersList: CharacterInfo[]) => {
    dispatch({ type: "SET_CHARACTERS_LIST", payload: charactersList });
  }, []);

  const setDisplayPlayground = useCallback((displayPlayground: boolean) => {
    dispatch({ type: "DISPLAY_PLAYGROUND", payload: displayPlayground });
  }, []);

  const shuffleCharactersList = useCallback(() => {
    setCharactersList(_shuffle(charactersList));
  }, [charactersList, setCharactersList]);

  const values = useMemo(
    () => ({
      score,
      setScore,
      openModal,
      setOpenModal,
      isChallengeComplete,
      setChallengeComplete,
      characterName,
      setCharacterName,
      charactersList,
      setCharactersList,
      shuffleCharactersList,
      displayPlayground,
      setDisplayPlayground,
    }),
    [
      score,
      setScore,
      openModal,
      setOpenModal,
      isChallengeComplete,
      setChallengeComplete,
      characterName,
      setCharacterName,
      charactersList,
      setCharactersList,
      shuffleCharactersList,
      displayPlayground,
      setDisplayPlayground,
    ]
  );

  return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
};

export default GameContextProvider;
