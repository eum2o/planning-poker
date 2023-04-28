import React, { useContext } from "react";
import { SocketContext } from "./context/socket";

function ResetArea() {
  const socket = useContext(SocketContext);

  const handleResetEstimations = async () => {
    socket.emit("resetEstimations");
  };

  const handleResetUsers = async () => {
    socket.emit("resetUsers");
  };

  return (
    <div className="d-flex justify-content-between">
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleResetEstimations}
      >
        Reset All Estimations
      </button>
      <button
        type="button"
        className="btn btn-danger btn-sm"
        onClick={handleResetUsers}
      >
        💀
      </button>
    </div>
  );
}

export default ResetArea;
