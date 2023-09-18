const { OpenAI } = require("langchain/llms/openai");
const { PromptTemplate } = require('langchain/prompts');
const { LLMChain } = require('langchain/chains');
const NodeCache = require('node-cache');
const express = require('express');
const router = express.Router();


const myCache = new NodeCache({ stdTTL: 86400, checkperiod: 120 });

router.post('/', async (req, res) => {
  try {
    const { event } = req.body;

    const cachedData = myCache.get(`ai_results_${event}`);
    if (cachedData) {
      return res.json({ results: cachedData });
    }

    const model = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: "gpt-3.5-turbo",
      temperature: 0,
    });

    const template = "Provide event ideas for activities to do on the day of the event. in your response, please be contemporary, fun, in-depth and list 3 events that a group can take part in. Include a couple emojis in your response and add unique adjectives.\n Event: {event}";
    const prompt = new PromptTemplate({ template, inputVariables: ['event'] });
    const chain = new LLMChain({ llm: model, prompt });

    const results = await Promise.all([chain.call({ event })]);

    myCache.set(`ai_results_${event}`, results);

    console.log('results', results);
    res.json({ results });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
