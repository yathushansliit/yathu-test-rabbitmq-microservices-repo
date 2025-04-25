const express = require("express");
const bodyParser = require("body-parser");
const Producer = require('./producer')
const producer = new Producer()

const app = express();
app.use(bodyParser.json("application/json"))


app.post('/sendLog', async(req,res,next)=>{
    await producer.publishMessage(req.body.logType, req.body.message);
    res.send();
})

app.get('/', async(req,res,next)=>{
    
    res.send("Hellodddcsdfsdfsdd");
})

app.listen(3000, ()=>{
    console.log("Server started.....")
})