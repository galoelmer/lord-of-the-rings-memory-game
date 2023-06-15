export interface CharacterInfo {
  image: string;
  key: string;
  isActive: boolean;
  name: string;
  height: string;
}

export interface IGameContext {
  score: number;
  setScore: (score: number) => void;
  openModal: boolean;
  setOpenModal: (openModal: boolean) => void;
  isChallengeComplete: boolean;
  setChallengeComplete: (isChallengeComplete: boolean) => void;
  characterName: string | null;
  setCharacterName: (characterName: string | null) => void;
  charactersList: CharacterInfo[];
  setCharactersList: (charactersList: CharacterInfo[]) => void;
  displayPlayground: boolean;
  setDisplayPlayground: (displayPlayground: boolean) => void;
  shuffleCharactersList: () => void;
}

export type GameActions =
  | { type: "DISPLAY_PLAYGROUND"; payload: boolean }
  | { type: "SET_SCORE"; payload: number }
  | { type: "SET_OPEN_MODAL"; payload: boolean }
  | { type: "SET_CHALLENGE_COMPLETE"; payload: boolean }
  | { type: "SET_CHARACTER_NAME"; payload: string | null }
  | { type: "SET_CHARACTERS_LIST"; payload: CharacterInfo[] };

export interface GameReducer {
  (state: IGameContext, action: GameActions): IGameContext;
}
