import React from 'react';

function UserList(props) {
  return (
    <ul>
      {props.users.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

export default UserList;
