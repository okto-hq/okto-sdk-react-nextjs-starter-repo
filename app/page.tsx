"use client";
import React, { useEffect, useMemo } from "react";
import { useSession, signOut } from "next-auth/react";
import { LoginButton } from "./components/LoginButton";
import { useOkto, OktoContextType } from "okto-sdk-react";
import GetButton from "./components/GetButton";
import TransferTokens from "./components/TransferTokens";

export default function Home() {
  const { data: session } = useSession();
  const {
    isLoggedIn,
    authenticate,
    logOut,
    getPortfolio,
    transferTokens,
    getWallets,
    createWallet,
    getSupportedNetworks,
    getSupportedTokens,
    getUserDetails,
    orderHistory,
    getNftOrderDetails,
    showWidgetModal,
  } = useOkto() as OktoContextType;
  const idToken = useMemo(() => (session ? session.id_token : null), [session]);

  async function handleAuthenticate(): Promise<any> {
    if (!idToken) {
      return { result : false}
    }
    let result = false;
    authenticate(idToken, (result: any, error: any) => {
      if (result) {
        console.log("Authentication successful");
        result = true;
        return { result };
      }
      if (error) {
        console.error("Authentication error:", error);
        signOut(); // Google SignOut
      }
    });
    return { result };
  }

  useEffect(() => {
    if (isLoggedIn) {
      console.log("Okto is authenticated");
    }
  }, [isLoggedIn]);

  return (
    <main className="flex min-h-screen flex-col items-center space-y-5 p-24">
      <div className="text-white font-bold text-2xl">Okto SDK</div>
      <LoginButton />
      <button
        className={`px-4 py-2 bg-blue-500 text-white rounded`}
        onClick={() => {
          showWidgetModal();
        }}
      >
        Show Modal
      </button>

      <GetButton
        title="Okto Authenticate"
        apiFn={handleAuthenticate}
      />
      <GetButton title="Okto Log out" apiFn={async () => logOut()} />
      <GetButton title="getPortfolio" apiFn={getPortfolio} />
      <GetButton title="getSupportedNetworks" apiFn={getSupportedNetworks} />
      <GetButton title="getSupportedTokens" apiFn={getSupportedTokens} />
      <GetButton title="getUserDetails" apiFn={getUserDetails} />
      <GetButton title="getWallets" apiFn={getWallets} />
      <GetButton title="createWallet" apiFn={createWallet} />
      <GetButton title="orderHistory" apiFn={() => orderHistory({})} />
      <GetButton
        title="getNftOrderDetails"
        apiFn={() => getNftOrderDetails({})}
      />
      <TransferTokens apiFn={transferTokens} />
    </main>
  );
}
