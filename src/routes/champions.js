const router = require("express").Router()
const { default: axios } = require("axios")
const lastVersion = "12.7.1"
const baseUrl = `http://ddragon.leagueoflegends.com/cdn/${lastVersion}/data`

router.get("/:language/champions", async (req, res) => {
    const { language } = req.params
    const url = `${baseUrl}/${language}/champion.json`

    try {
        const { data: responseData } = await axios.get(url)
        const championsObj = responseData.data

        const championsEntries = Object.keys(championsObj)
        const championsList = championsEntries.map(entry => championsObj[entry])

        return res.json(championsList)
    }

    catch (err) {
        console.error(err)
        return res.sendStatus(404)
    }
})

router.get("/:language/champions/:id", async (req, res) => {
    const { language, id } = req.params
    const url = `${baseUrl}/${language}/champion.json`

    try {
        const { data: responseData } = await axios.get(url)
        const championsObj = responseData.data

        const championsEntries = Object.keys(championsObj)
        const championsList = championsEntries.map(entry => championsObj[entry])

        const championsKeys = createChampionsKeys(championsList)
        const championId = championsKeys[id]
        const championById = championsList.find(champion => champion.id === championId)

        if (!championById) return res.sendStatus(404)

        return res.json(championById)
    }

    catch (err) {
        console.log(err)
        return res.sendStatus(404)
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

module.exports = router