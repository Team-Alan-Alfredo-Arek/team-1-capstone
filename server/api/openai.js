require('dotenv').config();
const axios = require('axios');
const router = require('express').Router();

const openAIApiKey = process.env.OPENAI_API_KEY;

router.get('/api/data', async (req, res) => {
    try {
      const apiResponse = await axios.get('https://api.openai.com/v1/chat/completions', {
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`
        }
      });
      res.json(apiResponse.data);
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send(error);
    }
});

module.exports = router;
