import { useContext } from "react";
import { SocketContext } from "../context/socket";

export default function LoginForm({
  userName,
  setUserName,
  setUserNameSubmitted,
}) {
  const socket = useContext(SocketContext);

  const handleNameSubmit = (event) => {
    event.preventDefault();
    setUserNameSubmitted(true);
    socket.emit("addUser", userName);
  };
  
  return (
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
  );
}
