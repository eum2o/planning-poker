import ParticipantList from "./ParticipantList";
import ResetArea from "./ResetArea";
import EstimationSummary from "./EstimationSummary";
import { valueToCardLabel, NO_ESTIMATION } from "../cards";
import "./EstimationArea.css";
import { useContext } from "react";
import { Tooltip } from "react-tooltip";
import { SocketContext } from "../context/socket";

export default function EstimationArea({
  userName,
  estimation,
  setEstimation,
  users,
}) {
  const socket = useContext(SocketContext);

  const handleEstimationSubmit = (value) => {
    socket.emit("addEstimation", { estimation: value });
    setEstimation(value);
  };

  return (
    <div>
      <div className="card mb-4">
        <div className="card-body">
          Good to see you {userName}, oh wise estimator. Now take your guess:
          <div className="estimation-buttons">
            {Object.entries(valueToCardLabel).map(([key, value]) => (
              <button
                key={key}
                onClick={() => handleEstimationSubmit(key)}
                disabled={estimation !== NO_ESTIMATION}
                className={estimation === key ? "selected" : ""}
                data-tooltip-id="card-tooltip"
                data-tooltip-content={value.description}
              >
                {value.label}
              </button>
            ))}
          </div>
          <Tooltip
            id="card-tooltip"
            place="top"
            delayShow={500}
          />
          <ParticipantList users={users} />
          <EstimationSummary users={users} />
        </div>
      </div>
      <ResetArea />
    </div>
  );
}
