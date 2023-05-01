require("dotenv").config();

const http = require("http");
const server = http.createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

let users = [];

io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);

  /**
   * Add a new user.
   */
  socket.on("addUser", (name) => {
    const newUser = { socketId: socket.id, name, estimation: -1 };
    users.push(newUser);
    console.log(`User added: ${name}`);
    io.emit("allUsers", users);
  });

  /**
   * Reset all users.
   */
  socket.on("resetUsers", () => {
    console.log("Users reset");
    users = [];
    io.emit("resetUsers", users);
  });

  /**
   * Add a new estimation for a user.
   */
  socket.on("addEstimation", ({ estimation }) => {
    const user = users.find((u) => u.socketId === socket.id);
    console.log(`Adding estimation for ${user.name}: ${estimation}`);

    user.estimation = estimation;
    io.emit("allUsers", users);
  });

  /**
   * Reset all estimations.
   */
  socket.on("resetEstimations", () => {
    console.log("Estimations reset");
    users.forEach((u) => (u.estimation = -1));
    io.emit("resetEstimations", users);
  });

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnected`);
    users = users.filter((u) => u.socketId !== socket.id);
    io.emit("allUsers", users);
  });
});

const PORT = process.env.REACT_APP_BACKEND_PORT;

server.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`);
});
