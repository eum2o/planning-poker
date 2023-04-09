import React from "react";
import { valueToButtonLabel } from "./constants";
import "./ParticipantList.css";

function ParticipantList({ users, currentUser }) {
  // check if all users have submitted their estimations
  const allEstimationsSubmitted = users.every((user) => user.estimation !== -1);

  // sort users by estimation if allEstimationsSubmitted is true
  const sortedUsers = allEstimationsSubmitted
    ? users.sort((a, b) => a.estimation - b.estimation)
    : users;

  return (
    <table className="ParticipantList">
      <tbody>
        {sortedUsers.map((user) => (
          <tr
            key={user.name}
            className={user.name === currentUser ? "current-user" : ""}
          >
            <td>
              {user.estimation === -1 ? "🤔" : "✅"}
              <span className="user-name">{user.name}</span>
            </td>
            {user.name === currentUser || allEstimationsSubmitted ? (
              <td className="user-estimation">
                <b>{valueToButtonLabel[user.estimation]}</b>
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
