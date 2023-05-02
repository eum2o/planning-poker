import React, { useContext } from "react";
import { valueToCardLabel, NO_ESTIMATION } from "../cards";
import "./ParticipantList.css";
import { SocketContext } from "../context/socket";

function ParticipantList({ users }) {
  const socket = useContext(SocketContext);

  const allEstimationsSubmitted = users.every(
    (user) => user.estimation !== NO_ESTIMATION
  );

  const getSortedUsers = (users) => {
    if (allEstimationsSubmitted) {
      return [...users].sort((a, b) => a.estimation - b.estimation);
    }
    return users;
  };

  const sortedUsers = getSortedUsers(users);

  return (
    <table className="ParticipantList">
      <tbody>
        {sortedUsers.map((user) => (
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
        ))}
      </tbody>
    </table>
  );
}

export default ParticipantList;
