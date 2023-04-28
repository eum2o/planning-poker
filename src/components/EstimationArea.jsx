import { useContext } from "react";
import ParticipantList from "./ParticipantList";
import ResetArea from "./ResetArea";
import EstimationSummary from "./EstimationSummary";
import { valueToButtonLabel } from "../constants";
import "./EstimationArea.css";
import { SocketContext } from "../context/socket";

export default function EstimationArea({
  userName,
  estimation,
  users,
  handleEstimationSubmit
}) {
  const socket = useContext(SocketContext);
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
  );
}
