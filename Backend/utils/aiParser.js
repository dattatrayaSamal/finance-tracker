const axios = require("axios");

const parseTransactionsWithAI = async (fileContent) => {
  const prompt = `
    Extract date, amount, description, and categorize the transaction from this statement:
    ${fileContent}
  `;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 500,
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error("Error parsing with AI:", error);
    throw error;
  }
};

module.exports = parseTransactionsWithAI;
