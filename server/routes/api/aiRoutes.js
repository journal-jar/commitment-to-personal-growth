const router = require('express').Router();
const {callOpenAiApi} = require("./ai")

router.post('/', async (req, res) => {
    console.log("routes.js openai req.body___________", req.body)

    var prompt = req.body.prompt
    var temperature = req.body.temperature;
    
    try {
        var promptResponse = await callOpenAiApi(prompt, temperature);
        res.status(200).json(promptResponse);
    } catch (err) {
        res.status(500).json({ error: "Error with OpenAI. Try sending again in a few seconds." });
    }
});

module.exports = router