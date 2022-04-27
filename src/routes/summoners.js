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
    const { platform } = req.params
    const apiKey = process.env.API_KEY || req.query.api_key
    const url = req.summonersDataURL

    try {
        const { data: summonerData } = await axios.get(url)
        const rankedStatuses = await getRankedStatuses(summonerData)
        const masteryScore = await getMasteryScore(summonerData)
        const summonerChampionMasteries = await getChampionMasteries(summonerData)

        Object.assign(summonerData, rankedStatuses, masteryScore, summonerChampionMasteries)

        return res.json(summonerData)
    }

    catch (err) {
        console.error(err.response.data.status)
        return res.json(err.response.data.status)
    }

    async function getChampionMasteries(summonerData) {
        const { id: summonerId } = summonerData
        const url = `https://${platform}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}?api_key=${apiKey}`
        const { data: championMasteries } = await axios.get(url)
        return { championMasteries }
    }

    async function getMasteryScore(summonerData) {
        const { id: summonerId } = summonerData
        const url = `https://${platform}.api.riotgames.com/lol/champion-mastery/v4/scores/by-summoner/${summonerId}?api_key=${apiKey}`
        const { data: masteryScore } = await axios.get(url)
        return { masteryScore }
    }

    async function getRankedStatuses(summonerData) {
        const { id: summonerId } = summonerData
        const url = `https://${platform}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}?api_key=${apiKey}`
        const { data: rankedStatuses } = await axios.get(url)
        return { rankedStatuses }
    }
})



module.exports = router