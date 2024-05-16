"use client";

import React from "react";
import { Provider } from "react-redux";
import { dispatch, store } from ".";

type Props = {
  children: React.ReactNode;
};

const ReduxProvider: React.FC<Props> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
