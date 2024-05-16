"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { NextPage } from "next";
import RotateIcon from "../../components/icon/RotateIcon";
import Counter from "../../components/Cards/Counter";
import {
  CardType,
  HistoryType,
  ResultType,
  SwipeType,
} from "../../type/index.d";
import CARDS from "../../data/card";
import Card from "../../components/Cards/Card";
import Head from "next/head";
import { useSelector } from "react-redux";
import { RootState, dispatch } from "@/store";
import { CircularProgress, Grid } from "@mui/material";
import { clearSession } from "@/store/reducer/session";
import { redirect } from "next/navigation";

const UsersList: React.FC = () => {
  const [cards, setCards] = useState(CARDS);
  const status = useSelector((state: RootState) => state.userSession); 

  const [result, setResult] = useState<ResultType>({
    like: 0,
    nope: 0,
    superlike: 0,
  });
  const [history, setHistory] = useState<HistoryType[]>([]);
  const activeIndex = cards.length - 1;


  if (status === "loading") {
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>;
  }

  // if (status === "unauthenticated" || status === undefined || status === null) {
  //   dispatch(clearSession());
  //   redirect("/");
  //   return <p>Access Denied</p>;
  // }
  // index of last card

  const removeCard = (oldCard: CardType, swipe: SwipeType) => {
    setHistory((current) => [...current, { ...oldCard, swipe }]);
    setCards((current) =>
      current.filter((card) => {
        return card.id !== oldCard.id;
      })
    );
    setResult((current) => ({ ...current, [swipe]: current[swipe] + 1 }));
  };
  const undoSwipe = () => {
    const newCard = history.pop();
    if (newCard) {
      const { swipe } = newCard;
      setHistory((current) =>
        current.filter((card) => {
          return card.id !== newCard.id;
        })
      );
      setResult((current) => ({ ...current, [swipe]: current[swipe] - 1 }));
      setCards((current) => [...current, newCard]);
    }
  };

  return (
    <div className="relative flex flex-col justify-center items-center w-full h-screen gradient">
      <Head>
        <title>Tinder cards with Framer motion</title>
      </Head>
      <AnimatePresence>
        {cards.map((card, index) => (
          <Card
            key={card.name}
            active={index === activeIndex}
            removeCard={removeCard}
            card={card}
          />
        ))}
      </AnimatePresence>
      {cards.length === 0 ? (
        <span className="text-black text-xl">End of Stack</span>
      ) : null}
      <footer className="absolute bottom-4 flex items-center space-x-4">
        <div className="flex flex-col items-center space-y-2">
          <button
            disabled={history.length === 0}
            className="w-14 h-14 rounded-full text-black bg-white inline-flex justify-center items-center disabled:cursor-not-allowed"
            onClick={undoSwipe}
            data-testid="undo-btn"
            aria-label="Undo Swipe"
          >
            <RotateIcon strokeWidth={3} />
          </button>
          <span className="text-xs text-white">Undo</span>
        </div>
        <Counter label="Likes" count={result.like} testid="like-count" />
        <Counter label="Nopes" count={result.nope} testid="nope-count" />
        <Counter
          label="Superlike"
          count={result.superlike}
          testid="superlike-count"
        />
      </footer>
    </div>
  );
};

export default UsersList;
