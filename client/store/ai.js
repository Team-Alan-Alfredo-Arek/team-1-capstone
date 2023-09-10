const { OpenAI } = require("langchain/llms/openai");
const { PromptTemplate } = require('langchain/prompts');
const { LLMChain } = require('langchain/chains');
require('dotenv').config();

const runModel = async () => {
  const model = new OpenAI({
      openAIApiKey: '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',
      modelName: "gpt-3.5-turbo",
      temperature: 0,
    });

  const template1 = "Provide event ideas for activities to do on the day of the event. in your response, please be contemporary, fun, in-depth and list 3 events that a group can take part in. Include a couple emojis in your response and add unique adjectives.\n Event: {event}";
  const prompt1 = new PromptTemplate({ template: template1, inputVariables: ['event'] });
  const chain1 = new LLMChain({ llm: model, prompt: prompt1 });

  const chains = [chain1];
  const results = await Promise.all(chains.map(chain => chain.call({ event: 'Thanksgiving Dinner' })));
  
  console.log(results);
};

runModel().catch(error => {
  console.error('An error occurred:', error);
});

