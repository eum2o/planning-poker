import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import ParticipantList from "./ParticipantList";
import ResetArea from "./ResetArea";
import EstimationSummary from "./EstimationSummary";
import {
  valueToButtonLabel,
  SOCKETIO_SERVER_URL,
  USERS_URL,
} from "./constants";
import "./estimationButtons.css";

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

  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useStateWithSessionStorage("userName", "");
  const [estimation, setEstimation] = useStateWithSessionStorage("estimation", null);
  const [userNameSubmitted, setUserNameSubmitted] = useStateWithSessionStorage("userNameSubmitted", false);

  // create function to update users state by sending a GET request to the server
  const updateUsers = () => {
    axios
      .get(USERS_URL)
      .then((res) => {
        let users = res.data;
        setUsers(res.data);
        // users is empty, reset userNameSubmitted, userName and estimation
        if (users.length === 0) {
          setUserNameSubmitted(false);
          setEstimation(null);
        }
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    const hash = window.location.hash.slice(1); // remove the "#" character
    if (hash) {
      setUserName(hash);
    }
  }, []);

  // Fetch all users and their estimations from the server when the component mounts for the first time (i.e. when the page loads)
  useEffect(() => {
    updateUsers();
  }, []);

  useEffect(() => {
    const socket = io(SOCKETIO_SERVER_URL, {
      agent: false,
    });
    socket.on("dbUpdated", () => {
      updateUsers();
    });
    socket.on("estimateReset", () => {
      setEstimation(null);
      updateUsers();
    });
    socket.on("userReset", () => {
      setUsers([]);
      setEstimation(null);
      setUserNameSubmitted(false);
    });
    return () => socket.disconnect();
  }, []);

  const handleNameSubmit = (event) => {
    event.preventDefault();
    setUserNameSubmitted(true);

    axios.post(USERS_URL, { name: userName }).then((res) => {
      setUsers((prevUsers) => [...prevUsers, res.data]);
      event.target.reset();
    });
  };

  const handleEstimationSubmit = (value) => {
    axios
      .post(`${USERS_URL}/${userName}/estimations`, {
        estimation: value,
      })
      .then((res) => {
        setEstimation(value);
      });
  };

  return (
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
            <ResetArea />
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
                    onChange={(event) => setUserName(event.target.value.trim())}
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
  );
}

export default App;
