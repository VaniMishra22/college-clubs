const express = require('express')
const userRouter = require('./routers/userRouter');
const clubRouter = require('./routers/clubRouter');
const utilRouter = require('./routers/utils');

const { createServer } = require("http");
const { Server } = require("socket.io");

const cors = require('cors');

const app = express();
const port = 5000;
//middleware

app.use(cors({
    origin: ["http://localhost:3000"]
}));
app.use(express.json());

app.use('/user', userRouter);
app.use('/club', clubRouter);
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
  
    socket.on("send-message", ({ senderData, message, date, rec_id }) => {
      console.log({ senderData, message, date });
      // socket.broadcast.emit("rec-message", {senderData, message, date});
      if (connectedUsers[rec_id]) {
        io.to(connectedUsers[rec_id]).emit("rec-message", { senderData, message, date });
      }
    });
  
    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });

//endpoint
app.listen(port, () => { console.log('server started'); })