const express = require('express');
const cors = require('cors');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*"
  }
});

const PORT = 5000;

app.use(express.json());
app.use(cors());

let users = [];

app.get('/api/users', (req, res) => {
  console.log('GET /api/users');
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const { name } = req.body;
  const userExists = users.some((u) => u.name === name);

  if (userExists) {    
    return;
  }

  const newUser = { name, estimation: -1 };
  users.push(newUser);
  console.log(`POST /api/users: ${name}`);

  io.emit('dbUpdated');

  res.json(newUser);
});

app.delete('/api/users', (req, res) => {
  console.log('DELETE /api/users');
  
  users = [];

  io.emit('userReset');

  res.json(users);
});

app.post('/api/users/:name/estimations', (req, res) => {
  const { name } = req.params;
  const { estimation } = req.body;
  console.log(`POST /api/users/${name}/estimations: ${estimation}`);

  const user = users.find((u) => u.name === name);
  if (!user) {
    res.status(404).send('User not found');
  } else {
    user.estimation = estimation;
    res.json(user);

    io.emit('dbUpdated');
  }
});

app.delete('/api/users/estimations', (req, res) => {
  console.log('DELETE /api/users/estimations');

  users.forEach((u) => (u.estimation = -1));

  io.emit('estimateReset');

  res.json(users);
});


server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
