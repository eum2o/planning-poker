require("dotenv").config();

const http = require("http");
const server = http.createServer();
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

let users = [];

function addUserOrdered(newUser) {
  const index = users.findIndex((u) => u.name > newUser.name);
  if (index === -1) {
    users.push(newUser);
  } else {
    users.splice(index, 0, newUser);
  }
}

io.on("connection", (socket) => {
  console.log(`Client ${socket.id} connected`);

  socket.on("addUser", (name) => {
    const newUser = { socketId: socket.id, name, estimation: -1 };

    // if the user already exists, do not add it again
    if (users.find((u) => u.socketId === socket.id)) {
      console.log(`User already exists: ${name}`);
      return;
    }

    addUserOrdered(newUser);
    console.log(`User added: ${name}`);
    io.emit("allUsers", users);
  });

  socket.on("resetUsers", () => {
    console.log("Users reset");
    users = [];
    io.emit("resetUsers", users);
  });

  socket.on("addEstimation", ({ estimation }) => {
    const user = users.find((u) => u.socketId === socket.id);
    if (user) {
      console.log(`Adding estimation for ${user.name}: ${estimation}`);
      user.estimation = estimation;
      io.emit("allUsers", users);
    } else {
      console.log(`User not found for socket ID: ${socket.id}`);
    }
  });

  socket.on("resetEstimations", () => {
    console.log("Estimations reset");
    users.forEach((u) => (u.estimation = -1));
    io.emit("resetEstimations", users);
  });

  socket.on("disconnect", () => {
    users = users.filter((u) => u.socketId !== socket.id);
    console.log(`Client ${socket.id} disconnected`);
    io.emit("allUsers", users);
  });
});

const PORT = process.env.REACT_APP_BACKEND_PORT;

server.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`);
});
