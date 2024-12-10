const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/",(req,res)=>{
    res.json({
        msg:"Hello Smit How Are You ?",
    })
})
app.listen(8000);