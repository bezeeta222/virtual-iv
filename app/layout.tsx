import ReduxProvider from "@/store/ReduxProvider";
import React, { ReactNode } from "react";

import "../styles/globals.css";

import Nav from "../components/Nav";
import Provider from "../components/Provider";

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Provider>
            <div className="main">
              <div className="gradient" />
            </div>
            <main className="app">
              <Nav />
              {children}
            </main>
          </Provider>
        </ReduxProvider>
      </body>
    </html>
  );
}
