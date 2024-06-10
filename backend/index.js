const express = require('express')
const userRouter = require('./routers/userRouter');
const clubRouter = require('./routers/clubRouter');
const announcementRouter = require('./routers/announcementRouter');
const eventRouter = require('./routers/eventRouter');
const utilRouter = require('./routers/utils');
const chatRouter = require('./routers/chatRouter');

const connectedUsers = {};

const { createServer } = require("http");
const { Server } = require("socket.io");

const cors = require('cors');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});
const port = 5000;
//middleware

app.use(cors({
  origin: ["http://localhost:3000"]
}));
app.use(express.json());

app.use('/user', userRouter);
app.use('/club', clubRouter);
app.use('/announcement', announcementRouter);
app.use('/event', eventRouter);
app.use('/chat', chatRouter);

app.use('/util', utilRouter);

app.use(express.static('./static/uploads'));

app.get('/', (req, res) => {
  res.send('respose from express')
});

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);


  socket.on("connect-user", (id) => {
    connectedUsers[id] = socket.id;
    console.log(connectedUsers);
  })

  socket.on("send-message", ({ sender, message, club, date }) => {
    console.log({ sender, message, date });
    // socket.broadcast.emit("rec-message", {senderData, message, date});
    if (connectedUsers[club]) {
      io.to(connectedUsers[club]).emit("rec-message", { sender, message, club, date, sent: false });
    }
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

//endpoint
httpServer.listen(port, () => { console.log('server started'); })