const express = require('express');
const app = express();
const cors = require('cors');
const port = 8000;
const indexRouter = require('./routes/index');
const custRouter = require('./routes/custRouter');
const resRouter = require('./routes/resRouter');
//listening
app.listen(port, () => console.info("Listening on port " + port));
const image_dir = "/Users/satishc/Desktop/Folders/Masters/SJSU/Courses/EDS - Shim/Images/restaurants/";
app.use('/static/images', express.static(image_dir));

//deprecated
//app.use(bodyParser.json());
console.log("dir_name "+__dirname);
app.use(express.json());
app.use(cors());
app.use("/", indexRouter);
app.use("/customer", custRouter);
app.use("/res", resRouter);
