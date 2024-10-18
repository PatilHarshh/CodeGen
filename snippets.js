require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

// Initialize GoogleGenerativeAI
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

async function generateSnippet(description, language, filename) {
  const prompt = `Generate a concise code snippet in ${language} for: ${description}. Please provide only the code.`;
  
  try {
    const result = await model.generateContent(prompt);
    const candidate = result?.response?.candidates?.[0];

    if (candidate && candidate.content && candidate.content.parts) {
      const snippet = candidate.content.parts.map(part => part.text).join('\n').trim();
      fs.writeFileSync(filename, snippet, 'utf8');
      console.log(`Snippet saved to ${filename}`);
    } else {
      console.error('Unexpected response format:', result);
    }
  } catch (error) {
    console.error('Error generating snippet:', error.message);
  }
}

module.exports = { generateSnippet };
