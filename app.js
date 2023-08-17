const express =require("express")
const res = require("express/lib/response")
const app = express()
const cors = require("cors");
require("dotenv").config()
require("./src/config/databaseConnection")
const port= process.env.PORT || 5001
const todoRouter=require("./src/Routers/todoRouter")

app.use(express.json())

app.use(cors());

app.use("/api",todoRouter)

app.get("/",(req,res)=>{
    res.send("Hoş Geldiniz...");
})

app.listen(port, ()=> {
    console.log('Server ${port} Portundan Başlatildi ...');
})
