export const scoreReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_SCORE":
      return { ...state, score: action.payload };
    case "RESET_SCORE":
      return { ...state, score: 0 };
    case "OPEN_MODAL":
      return { ...state, openModal: true };
    case "CLOSE_MODAL":
      return { ...state, openModal: false };
    case "SET_CHALLENGE_COMPLETE":
      return { ...state, isChallengeComplete: true };
    case "RESET_CHALLENGE":
      return { ...state, isChallengeComplete: false };
    case "SET_CHARACTER_NAME": 
        return {...state, characterName: action.payload};
    case "REMOVE_CHARACTER_NAME":
        return {...state, characterName: null }
    default:
      return state;
  }
};