// import _shuffle from "lodash.shuffle";
// import charactersList from "./charactersList";
import { GameReducer } from "./types";

const reducer: GameReducer = (state, action) => {
  switch (action.type) {
    case "DISPLAY_PLAYGROUND":
      return { ...state, displayPlayground: action.payload };
    case "SET_SCORE":
      return { ...state, score: action.payload };
    // case "RESET_SCORE":
    //   return { ...state, score: 0 };
    case "SET_OPEN_MODAL":
      return { ...state, openModal: action.payload };
    // case "CLOSE_MODAL":
    //   return { ...state, openModal: false };
    case "SET_CHALLENGE_COMPLETE":
      return { ...state, isChallengeComplete: action.payload };
    // case "RESET_CHALLENGE":
    //   return { ...state, isChallengeComplete: false };
    case "SET_CHARACTER_NAME":
      return { ...state, characterName: action.payload };
    // case "REMOVE_CHARACTER_NAME":
    //   return { ...state, characterName: null };
    case "SET_CHARACTERS_LIST": {
      return { ...state, charactersList: action.payload };
    }
    // case "RESET_IMAGES_LIST": {
    //   return { ...state, list: _shuffle(charactersList).slice(0, 12) };
    // }
    default:
      return state;
  }
};

export default reducer;
