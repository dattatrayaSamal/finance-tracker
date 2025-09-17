const API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage";

async function callGeminiAPI(prompt) {
  try {
    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        prompt: {
          messages: [{ content: prompt, role: "USER" }],
        },
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data.candidates[0].message.content;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}

(async () => {
  const prompt = "Hello, Gemini! What's the weather today?";
  try {
    const reply = await callGeminiAPI(prompt);
    console.log("Gemini reply:", reply);
  } catch (error) {
    console.error("Request failed:", error);
  }
})();
