const express = require('express');
const app = express();
const port = 8000;
const indexRouter = require('./routes/index');
const userRouter = require('./routes/userRouter');
const resRouter = require('./routes/resRouter');

//listening
app.listen(port, () => console.info("Listening on port " + port));

//deprecated
//app.use(bodyParser.json());

app.use(express.json());
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/res", resRouter);