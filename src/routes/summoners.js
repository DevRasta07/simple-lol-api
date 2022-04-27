const router = require("express").Router()
const { default: axios } = require("axios")

router.use("/:platform/summoners/:method/:key", (req, res, next) => {
    const { platform, method, key } = req.params
    const apiKey = process.env.API_KEY || req.query.api_key

    if (method === "by-summoner-id") {
        const url = `https://${platform}.api.riotgames.com/lol/summoner/v4/summoners/${key}?api_key=${apiKey}`
        req.summonersDataURL = url
    } else {
        const url = `https://${platform}.api.riotgames.com/lol/summoner/v4/summoners/${method}/${key}?api_key=${apiKey}`
        req.summonersDataURL = url
    }

    next()
})

router.get("/:platform/summoners/:method/:key", async (req, res) => {
    const url = req.summonersDataURL

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