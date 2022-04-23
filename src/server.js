const { default: axios } = require("axios")
const cors = require("cors")
const express = require("express")
const app = express()

const PORT = 3000
const championsDataUrl = "http://ddragon.leagueoflegends.com/cdn/9.3.1/data/en_US/champion.json"

app.use(cors())

app.get("/champions", async (req, res) => {
    try {
        const { data: responseData } = await axios.get(championsDataUrl)
        const championsObj = responseData.data

        const championsEntries = Object.keys(championsObj)
        const championsList = championsEntries.map(entry => championsObj[entry])

        return res.json(championsList)
    }

    catch (err) {
        console.error(err)
    }
})

app.get("/champions/:id", async (req, res) => {
    const id = req.params.id

    try {
        const { data: responseData } = await axios.get(championsDataUrl)
        const championsObj = responseData.data

        const championsEntries = Object.keys(championsObj)
        const championsList = championsEntries.map(entry => championsObj[entry])

        const championsKeys = createChampionsKeys(championsList)
        const championId = championsKeys[id]
        const championById = championsList.find(champion => champion.id === championId)

        if (!championById) return res.status(204).json()

        return res.json(championById)
    }

    catch (err) {
        return res.send(err.message)
    }

    function createChampionsKeys(champions) {
        const keysObject = {}

        champions.forEach(champion => {
            const id = champion.id
            const key = id === "MonkeyKing" ? "wukong" : id.toLowerCase()
            keysObject[key] = id
        })
            
        return keysObject
    }
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
})