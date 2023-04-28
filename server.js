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

  socket.on("addUser", (name) => {
    const userExists = users.some((u) => u.name === name);

    if (userExists) {
      return;
    }

    const newUser = { name, estimation: -1 };
    users.push(newUser);
    console.log(`User added: ${name}`);
    io.emit("allUsers", users);
  });

  socket.on("resetUsers", () => {
    console.log("Users reset");
    users = [];
    io.emit("resetUsers", users);
  });

  socket.on("addEstimation", ({ name, estimation }) => {
    console.log(`Adding estimation for ${name}: ${estimation}`);

    const user = users.find((u) => u.name === name);
    if (!user) {
      console.error(`User ${name} not found`);
      return;
    }

    user.estimation = estimation;
    io.emit("allUsers", users);
  });

  socket.on("resetEstimations", () => {
    console.log("Estimations reset");
    users.forEach((u) => (u.estimation = -1));
    io.emit("resetEstimations", users);
  });

  socket.on("disconnect", () => {
    console.log(`Client ${socket.id} disconnected`);
  });
});

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`Socket.io server running on port ${PORT}`);
});
