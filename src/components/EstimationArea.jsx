import ParticipantList from "./ParticipantList";
import ResetArea from "./ResetArea";
import EstimationSummary from "./EstimationSummary";
import { valueToButtonLabel } from "../constants";
import "./EstimationArea.css";
import { useContext } from "react";
import { SocketContext } from "../context/socket";

export default function EstimationArea({ userName, estimation, users }) {
  const socket = useContext(SocketContext);

  const handleEstimationSubmit = (value) => {
    socket.emit("addEstimation", { estimation: value });
  };

  return (
    <div>
      <div className="card mb-4">
        <div className="card-body">
          Good to see you {userName}, oh wise estimator. Now take your guess:
          <div className="estimation-buttons">
            {Object.entries(valueToButtonLabel).map(([key, value]) => (
              <button
                key={key}
                onClick={() => handleEstimationSubmit(key)}
                disabled={estimation !== -1}
                className={estimation === key ? "selected" : ""}
              >
                {value}
              </button>
            ))}
          </div>
          <ParticipantList users={users} />
          <EstimationSummary users={users} />
        </div>
      </div>
      <ResetArea />
    </div>
  );
}
