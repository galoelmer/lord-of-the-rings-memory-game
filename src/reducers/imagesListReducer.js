import _shuffle from "lodash.shuffle";
import list from "../imagesUrl";

export const imagesListReducer = (state, action) => {
  switch (action.type) {
    case "SHUFFLE_LIST_IMAGES": {
      return { ...state, list: _shuffle(state.list) };
    }
    case "RESET_IMAGES_LIST": {
      return { ...state, list: _shuffle(list).slice(0, 12) };
    }
    default:
      return state;
  }
};
