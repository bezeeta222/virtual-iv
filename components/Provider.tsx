"use client";

import { SessionProvider } from "next-auth/react";

interface ProviderProps {
  children: any;
  session: any; // Define the type of the session prop
}

const Provider: any = ({ children, session }: ProviderProps) => (
  <SessionProvider session={session}>{children}</SessionProvider>
);

export default Provider;
