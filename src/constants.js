// don't use "-1" as this is used for "no estimation" in the server
export const valueToButtonLabel = {
  "0": "0",
  "1": "1",
  "2": "2",
  "3": "3",
  "5": "5",
  "8": "8",
  "13": "13",
  "21": "21",
  "-2": "✂️",
  "-3": "🤷🏻",
  "-4": "🍵",
};

export const SOCKETIO_SERVER_URL = `http://${process.env.REACT_APP_SERVER_HOSTNAME || 'localhost'}:3001`;
