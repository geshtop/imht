require("dotenv").config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const corsOptions = require("./config/corsOptions")
const connectDB = require("./config/connectDB")
const app = express()
const PORT = process.env.PORT || 1100
connectDB()
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.static("public"))
app.get("/", (req,res)=>{
    res.send("home page")
})
app.use("/api/auth", require("./routes/authRoutes"))

app.use("/api/companies", require("./routes/companyRoutes"))
app.use("/api/users", require("./routes/userRoutes"))

mongoose.connection.once("open", ()=>{
    console.log("Connected To DB success")
    app.listen(PORT, ()=>{
        console.log(`Sever running on port ${PORT}`)
    })
})

mongoose.connection.on("error", (err)=>{
    console.log("CONNECT TO DB ERROR")
    console.log(err)
})

