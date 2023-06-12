const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express()
const mongoDB = require("./db")
mongoDB();
const port = 7000

mongoose.set('strictQuery',false);

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-COntrol-Allow-Headers",
        "Origin, X-Requested-With, Content-Type,Accept"
    );
    next()
})

app.use(express.json())
app.use('/api/', require("./routes/login"));
app.use('/api/', require("./routes/DisplayData"));
app.use('/api/', require("./routes/OrderData"));
app.get('/', (req,res) => {
    res.send('Hello')
})

app.listen(port, () => {
    console.log(`listening to port ${port}`);
})