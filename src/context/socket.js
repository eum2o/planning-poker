import socketio from "socket.io-client";
import { createContext } from "react";

const SOCKETIO_SERVER_URL = `http://${process.env.REACT_APP_BACKEND_HOSTNAME}:${process.env.REACT_APP_BACKEND_PORT}`;

export const socket = socketio.connect(SOCKETIO_SERVER_URL);
export const SocketContext = createContext(socket);
