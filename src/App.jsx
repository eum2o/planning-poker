import React, { useState, useEffect, useContext, useCallback } from "react";
import { SocketContext } from "./context/socket";
import EstimationArea from "./components/EstimationArea";
import LoginForm from "./components/LoginForm";

// Use the session storage to persist the user name and estimation value when the page is refreshed.
function useStateWithSessionStorage(key, initialValue) {
  const [state, setState] = useState(
    JSON.parse(sessionStorage.getItem(key)) || initialValue
  );
  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

function App() {
  const [users, setUsers] = useStateWithSessionStorage("users", []);
  const [userName, setUserName] = useStateWithSessionStorage("userName", "");
  const [estimation, setEstimation] = useStateWithSessionStorage(
    "estimation",
    null
  );
  const [userNameSubmitted, setUserNameSubmitted] = useStateWithSessionStorage(
    "userNameSubmitted",
    false
  );

  useEffect(() => {
    // If the URL contains a hash, use it as the user name. Useful for bookmarking.
    const hash = window.location.hash.slice(1); // remove the "#" character
    if (hash) {
      setUserName(hash);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const socket = useContext(SocketContext);

  const handleOnUpdateUsers = useCallback(
    (users) => {
      setUsers(users);
    },
    [setUsers]
  );

  const handleOnEstimateReset = useCallback(
    (users) => {
      setUsers(users);
      setEstimation(null);
    },
    [setEstimation, setUsers]
  );

  const handleResetUsers = useCallback(() => {
    setUsers([]);
    setEstimation(null);
    setUserNameSubmitted(false);
  }, [setEstimation, setUserNameSubmitted, setUsers]);

  useEffect(() => {
    socket.on("allUsers", (users) => handleOnUpdateUsers(users));
    socket.on("resetEstimations", (users) => handleOnEstimateReset(users));
    socket.on("resetUsers", () => handleResetUsers());
    return () => {
      socket.off("allUsers");
      socket.off("resetEstimations");
      socket.off("resetUsers");
    };
  }, [socket, handleOnUpdateUsers, handleOnEstimateReset, handleResetUsers]);

  const handleNameSubmit = (event) => {
    event.preventDefault();
    setUserNameSubmitted(true);
    socket.emit("addUser", userName);
  };

  const handleEstimationSubmit = (value) => {
    setEstimation(value);
    socket.emit("addEstimation", { name: userName, estimation: value });
  };

  return (
    <SocketContext.Provider value={socket}>
      <div className="App container my-5">
        <header className="App-header text-center">
          <h1 style={{ fontFamily: "Bangers", fontSize: "4rem" }}>
            🂡 Peculiar Planning Poker 🃏
          </h1>
          <p className="text-muted font-italic small">
            ... where every guess is a wild card.
          </p>
        </header>
        <main className="py-5">
          {userNameSubmitted ? (
            <EstimationArea
              userName={userName}
              estimation={estimation}
              users={users}
              handleEstimationSubmit={handleEstimationSubmit}
            />
          ) : (
            <LoginForm
              userName={userName}
              setUserName={setUserName}
              handleNameSubmit={handleNameSubmit}
            />
          )}
        </main>
      </div>
    </SocketContext.Provider>
  );
}

export default App;
