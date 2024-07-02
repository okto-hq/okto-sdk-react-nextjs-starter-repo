"use client";
import React, { useEffect, useMemo } from "react";
import { useSession, signOut } from "next-auth/react";
import { LoginButton } from "./components/LoginButton";
import { useOkto, OktoContextType, BuildType } from "okto-sdk-react";
import GetButton from "./components/GetButton";
import TransferTokens from "./components/TransferTokens";
import {useAppContext} from "./components/AppContext"

export default function Home() {
  const { data: session } = useSession();
  const { apiKey, setApiKey, buildType, setBuildType } = useAppContext();
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
    authenticate(idToken, (result: any, error: any) => {
      if (result) {
        console.log("Authentication successful");
        return { result: true };
      }
      if (error) {
        console.error("Authentication error:", error);
        signOut(); // Google SignOut
        return { result : false}
      }
    });
    return { result: "authenticate" };
  }

  useEffect(() => {
    if (isLoggedIn) {
      console.log("Okto is authenticated");
    }
  }, [isLoggedIn]);

  return (
    <main className="flex min-h-screen flex-col items-center space-y-5 p-24">
      <div className="text-white font-bold text-2xl">Okto SDK</div>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-white mr-4">API Key:</label>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="px-4 py-2 rounded bg-gray-800 text-white"
          />
        </div>
        <div className="space-y-2">
          <label className="text-white mr-4">Build Type:</label>
          <select
            value={buildType}
            onChange={(e) => setBuildType(e.target.value)}
            className="px-4 py-2 rounded bg-gray-800 text-white"
          >
            <option value={BuildType.SANDBOX}>Sandbox</option>
            <option value={BuildType.STAGING}>Staging</option>
            <option value={BuildType.PRODUCTION}>Production</option>
          </select>
        </div>
      </div>

      <LoginButton />
      <button
        className={`px-4 py-2 bg-blue-500 text-white rounded`}
        onClick={() => {
          showWidgetModal();
        }}
      >
        Show Modal
      </button>

      <GetButton title="Okto Authenticate" apiFn={handleAuthenticate} />
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
