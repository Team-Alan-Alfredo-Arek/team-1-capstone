const { OpenAI } = require("langchain/llms/openai");
const { PromptTemplate } = require("langchain/prompts");
const { StructuredOutputParser } = require("langchain/output_parsers");
const { LLMChain } = require("langchain/chains");
const NodeCache = require("node-cache");
const express = require("express");
const router = express.Router();

const myCache = new NodeCache({ stdTTL: 86400, checkperiod: 120 });

// Endpoint for generating event ideas
router.post("/event-ideas", async (req, res) => {
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

    const template =
      "Provide event ideas for activities to do on the day of the event. in your response, please be contemporary, fun, in-depth but limit each description to 2 sentences. List 3 events that a group can take part in. Include a couple emojis in your response and add unique adjectives.\n Event: {event}";
    const prompt = new PromptTemplate({ template, inputVariables: ["event"] });
    const chain = new LLMChain({ llm: model, prompt });

    const [results] = await Promise.all([chain.call({ event })]);

    myCache.set(`ai_results_${event}`, results);

    res.json({ results });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint for generating tasks
router.post("/generate-tasks", async (req, res) => {
  try {
    const { event } = req.body;

    const cachedData = myCache.get(`ai_tasks_${event.name}`);
    if (cachedData) {
      return res.json({ results: cachedData });
    }

    const model = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: "gpt-3.5-turbo",
      temperature: 0.7,
    });

    const parser = StructuredOutputParser.fromNamesAndDescriptions({
      taskName: "Task Name",
      dueDate: "Due Date",
    });

    const formatInstructions = parser.getFormatInstructions();

    const prompt = new PromptTemplate({
      template:
        " Based on the event \n Event: {event}, please generate a list of tasks that need to be done before, during and after the event. Make sure to specify the due date for each task. Make sure to respond neatly with proper spacing inbetween each task that you provide. Only list 3 tasks: Please see below for examples: \n 1. Task Name: Buy decorations for the event. Due Date: 11/20/2021",
      inputVariables: ["event"],
      partialVariables: { format_instructions: formatInstructions },
    });

    const chain = new LLMChain({ llm: model, prompt });

    const [results] = await Promise.all([chain.call({ event })]);

    myCache.set(`ai_tasks_${event.name}`, results);

    res.json({ results });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
