const cors = require("cors")
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())

app.get("/", (req, res) => {
    res.send("Welcome to the Simple LoL Api!")
})

app.use("/", require("./routes/champions"))
app.use("/", require("./routes/summoners"))

app.listen(PORT)