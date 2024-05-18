"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { NextPage } from "next";
import RotateIcon from "../../components/icon/RotateIcon";
import Counter from "../../components/Cards/Counter";
import {
  HistoryType,
  ResultType,
  SwipeType,
  UserType,
} from "../../type/index.d";
import Card from "../../components/Cards/Card";
import { useSelector } from "react-redux";
import { RootState, dispatch } from "@/store";
import { CircularProgress, Grid } from "@mui/material";
import { clearSession } from "@/store/reducer/session";
import { redirect } from "next/navigation";

const UsersList: NextPage = () => {
  const [userList, setUserList] = useState<UserType[]>([]);
  const [result, setResult] = useState<ResultType>({
    like: 0,
    nope: 0,
    superlike: 0,
  });
  const [history, setHistory] = useState<(UserType & { swipe: SwipeType })[]>(
    []
  );
  const activeIndex = userList.length - 1;

  const status = useSelector((state: RootState) => state.userSession);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (
      status === "unauthenticated" ||
      status === undefined ||
      status === null
    ) {
      dispatch(clearSession());
      redirect("/");
    }
  }, [status]);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/listUser?email=jack.wong@example.com");
      const data = await response.json();
      setUserList(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const removeUser = (oldUser: UserType, swipe: SwipeType) => {
    setHistory((current) => [...current, { ...oldUser, swipe }]);
    setUserList((current) =>
      current.filter((user) => {
        return user.id !== oldUser.id;
      })
    );
    setResult((current) => ({ ...current, [swipe]: current[swipe] + 1 }));
  };

  const undoSwipe = () => {
    const newUser = history.pop();
    if (newUser) {
      const { swipe, ...rest } = newUser;
      setHistory((current) =>
        current.filter((user) => {
          return user.id !== newUser.id;
        })
      );
      setResult((current) => ({ ...current, [swipe]: current[swipe] - 1 }));
      setUserList((current) => [...current, rest]);
    }
  };

  if (status === "loading") {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }

  if (status === "unauthenticated" || status === undefined || status === null) {
    return <p>Access Denied</p>;
  }

  return (
    <div className="relative flex flex-col justify-center items-center w-full h-screen gradient">
      <AnimatePresence>
        {userList.map((user, index) => (
          <Card
            key={user.id}
            active={index === activeIndex}
            removeCard={removeUser}
            user={user}
          />
        ))}
      </AnimatePresence>
      {userList.length === 0 ? (
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
