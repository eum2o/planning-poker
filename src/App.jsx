import React, { useState, useEffect, useContext, useCallback } from "react";
import ParticipantList from "./ParticipantList";
import ResetArea from "./ResetArea";
import EstimationSummary from "./EstimationSummary";
import { valueToButtonLabel } from "./constants";
import "./estimationButtons.css";
import { SocketContext } from "./context/socket";

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

  const handleOnUpdateUsers = useCallback((users) => {
    setUsers(users);
  }, [setUsers]);

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
            <div>
              <div className="card mb-4">
                <div className="card-body">
                  Good to see you {userName}, oh wise estimator. Now take your
                  guess:
                  <div className="estimation-buttons">
                    {Object.entries(valueToButtonLabel).map(([key, value]) => (
                      <button
                        key={key}
                        onClick={() => handleEstimationSubmit(key)}
                        disabled={estimation !== null}
                        className={estimation === key ? "selected" : ""}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                  <ParticipantList currentUser={userName} users={users} />
                  <EstimationSummary currentUser={userName} users={users} />
                </div>
              </div>
              <ResetArea socket={socket} />
            </div>
          ) : (
            <div className="d-flex flex-column justify-content-center align-items-center text-center">
              <form onSubmit={handleNameSubmit}>
                <div className="d-flex">
                  <div className="form-floating me-2">
                    <input
                      type="text"
                      className="form-control"
                      id="nameInput"
                      placeholder="Enter your name"
                      value={userName}
                      onChange={(event) =>
                        setUserName(event.target.value.trim())
                      }
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary ml-2"
                    disabled={!userName.trim()}
                  >
                    Join
                  </button>
                </div>
              </form>
            </div>
          )}
        </main>
      </div>
    </SocketContext.Provider>
  );
}

export default App;
