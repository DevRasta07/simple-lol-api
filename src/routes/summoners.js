const router = require("express").Router()
const { default: axios } = require("axios")
// const API_KEY = "RGAPI-55c7270e-5b45-4260-b155-24657ef83aca"

router.get("/:platform/summoners/:method/:key", async (req, res) => {
    const { platform, method, key } = req.params
    const { api_key: apiKey } = req.query
    let url

    if (method === "by-summoner-id") {
        url = `https://${platform}.api.riotgames.com/lol/summoner/v4/summoners/${key}?api_key=${apiKey}`
    }

    else {
        url = `https://${platform}.api.riotgames.com/lol/summoner/v4/summoners/${method}/${key}?api_key=${apiKey}`
    }

    try {
        const { data: summonerData } = await axios.get(url)
        return res.json(summonerData)
    }

    catch (err) {
        console.error(err.response.data.status)
        return res.status(404).send(err.response.data.status.message)
    }
})

module.exports = router