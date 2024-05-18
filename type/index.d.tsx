import CARDS from "../data/card";

type ArrayElementType<ArrType> = ArrType extends readonly (infer ElementType)[]
  ? ElementType
  : never;

export type CardType = ArrayElementType<typeof CARDS>;

export type SwipeType = "like" | "nope" | "superlike";

export type ResultType = { [k in SwipeType]: number };

export type HistoryType = CardType & { swipe: SwipeType };

export interface CardProps {
  card: CardType;
  active: boolean;
  removeCard: (oldCard: CardType, swipe: SwipeType) => void;
}

export interface UserType {
  email: string;
  gender: string;
  id: number;
  interests: string;
  location: string;
  name: string;
  profile_picture_url: string;
  score: number;
  university: string;
}



