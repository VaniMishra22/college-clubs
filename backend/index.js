const express = require('express')
const userRouter = require('./routers/userRouter');
const clubRouter = require('./routers/clubRouter');
const utilRouter = require('./routers/utils');

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

//endpoint
app.listen(port, () => { console.log('server started'); })