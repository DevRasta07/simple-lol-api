const cors = require("cors")
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use("/", require("./routes/champions.js"))

app.get("/", (req, res) => {
    res.send()
})

app.listen(PORT)