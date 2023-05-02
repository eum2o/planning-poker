import React, { useContext } from "react";
import { valueToCardLabel, NO_ESTIMATION } from "../cards";
import "./ParticipantList.css";
import { SocketContext } from "../context/socket";

function ParticipantList({ users }) {
  const socket = useContext(SocketContext);

  // check if all users have submitted their estimations
  const allEstimationsSubmitted = users.every(
    (user) => user.estimation !== NO_ESTIMATION
  );

  // sort users by estimation if allEstimationsSubmitted is true
  const sortedUsers = allEstimationsSubmitted
    ? users.sort((a, b) => a.estimation - b.estimation)
    : users;

  return (
    <table className="ParticipantList">
      <tbody>
        {sortedUsers.map(
          (user) => (
            (
              <tr
                key={user.name}
                className={user.socketId === socket.id ? "current-user" : ""}
              >
                <td>
                  {user.estimation === NO_ESTIMATION ? "🤔" : "✅"}
                  <span className="user-name">{user.name}</span>
                </td>
                {user.socketId === socket.id || allEstimationsSubmitted ? (
                  <td className="user-estimation">
                    <b>{valueToCardLabel[user.estimation]}</b>
                  </td>
                ) : (
                  <td className="user-estimation-placeholder">&nbsp;&nbsp;</td>
                )}
              </tr>
            )
          )
        )}
      </tbody>
    </table>
  );
}

export default ParticipantList;
