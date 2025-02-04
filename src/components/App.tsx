import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useCurrentUser, useSearch } from "../hooks";
import { Channel } from "../types";
import { Dashboard } from "./Dashboard";
import { Home } from "./Home";
import { NavBar } from "./NavBar";
import { GoogleOAuthProvider } from "@react-oauth/google";

export const App = () => {
  const { currentUserActions, currentUserState } = useCurrentUser();
  const searchState = useSearch();
  const authToken =
    (currentUserState &&
      currentUserState.data &&
      currentUserState.data.authToken) ||
    null;

  const getChannel = (channelId: string): Channel => {
    return searchState.channelResults.find(
      (channel: Channel) => channel.id === channelId
    );
  };

  return (
    <GoogleOAuthProvider clientId="396042846302-6vufhiukmtkt2peodu1m15v37odu4816.apps.googleusercontent.com">
      <Router>
        <NavBar
          currentUserState={currentUserState}
          currentUserActions={currentUserActions}
        />
        <Routes>
          <Route
            path="/"
            element={<Home authToken={authToken} searchState={searchState} />}
          />
          <Route
            path="/:channelId"
            element={
              <Dashboard authToken={authToken} getChannel={getChannel} />
            }
          />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};
