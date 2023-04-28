import socketio from "socket.io-client";
import { SOCKETIO_SERVER_URL } from "../constants";
import { createContext } from "react";

export const socket = socketio.connect(SOCKETIO_SERVER_URL);
export const SocketContext = createContext(socket);
