import { GameReducer } from "./types";

const reducer: GameReducer = (state, action) => {
  switch (action.type) {
    case "DISPLAY_PLAYGROUND":
      return { ...state, displayPlayground: action.payload };
    case "SET_SCORE":
      return { ...state, score: action.payload };
    case "SET_OPEN_MODAL":
      return { ...state, openModal: action.payload };

    case "SET_CHALLENGE_COMPLETE":
      return { ...state, isChallengeComplete: action.payload };

    case "SET_CHARACTER_NAME":
      return { ...state, characterName: action.payload };

    case "SET_CHARACTERS_LIST": {
      return { ...state, charactersList: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
