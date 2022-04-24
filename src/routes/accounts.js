const router = require("express").Router()
const { default: axios } = require("axios")
// const API_KEY = "RGAPI-55c7270e-5b45-4260-b155-24657ef83aca"

router.get("/:region/accounts/:method/:key1/:key2?", async (req, res) => {
    const { region, method, key1, key2 } = req.params
    const { api_key: apiKey } = req.query
    let url

    if (method === "by-riot-id") {
        url = `https://${region}.api.riotgames.com/riot/account/v1/accounts/${method}/${key1}/${key2}?api_key=${apiKey}`
    }

    else {
        url = `https://${region}.api.riotgames.com/riot/account/v1/accounts/${method}/${key1}?api_key=${apiKey}`    
    }

    try {
        const { data: summonerData } = await axios.get(url)
        return res.json(summonerData)
    }

    catch (err) {
        if (!err.response) return res.sendStatus(404)
        return res.status(404).send(err.response.data.status.message)
    }
})

module.exports = router