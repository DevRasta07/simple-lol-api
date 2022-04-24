const cors = require("cors")
const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())

app.get("/", (req, res) => {
    res.send()
})

app.use("/", require("./routes/champions"))
app.use("/", require("./routes/accounts"))

app.listen(PORT)