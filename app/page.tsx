"use client";

import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setSession, clearSession } from "../store/reducer/session";
import { RootState, AppDispatch } from "../store";
import { Grid, CircularProgress } from "@mui/material";

const Home = () => {
  const { data: session, status } = useSession(); // Get the user session
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();

  if (status === "loading") {
    dispatch(setSession(status));
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

  if (status === "authenticated") {
    dispatch(setSession(status));
    router.push("/user");
    return <p>Access Granted</p>;
  } else {
    dispatch(clearSession());
  }

  return (
    <section className="w-full flex-center flex-col mt-20">
      <h1 className="head_text text-center">
       
        <span className="orange_gradient text-center">
          {" "}
          Interview Assessment
        </span>
      </h1>
      <p className="text-center m-10">Please sign in to access your account.</p>
    </section>
  );
};

export default Home;
