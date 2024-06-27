"use client";
import React from "react";
import { OktoProvider, BuildType } from "okto-sdk-react";
import { SessionProvider } from "next-auth/react";

function AppProvider({ children, session }) {
  return (
    <SessionProvider session={session}>
      <OktoProvider
        apiKey={process.env.NEXT_PUBLIC_OKTO_CLIENT_API}
        buildType={BuildType.SANDBOX}
      >
        {children}
      </OktoProvider>
    </SessionProvider>
  );
}

export default AppProvider;
