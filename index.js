#!/usr/bin/env node

// index.js
const fs = require('fs');
const path = require('path');
const readline = require('readline');
require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const figlet = require('figlet');


// Function to display the welcome message
function displayWelcomeMessage() {
  figlet('CodeGen!', (err, data) => {
    if (err) {
      console.log('Something went wrong...');
      console.dir(err);
      return;
    }
    console.log(data);
  });
}

displayWelcomeMessage();

const apiKeyFile = path.join(__dirname, 'apikey.json');


// Function to get or prompt for the API key
async function getApiKey() {
  if (fs.existsSync(apiKeyFile)) {
    const apiKeyData = fs.readFileSync(apiKeyFile);
    const { apiKey } = JSON.parse(apiKeyData);
    return apiKey;
  } else {
    const apiKey = await askQuestion('Please enter your API key: ');
    // Store the API key in a JSON file
    fs.writeFileSync(apiKeyFile, JSON.stringify({ apiKey }));
    return apiKey;
  }
}

// Function to ask for user input
function askQuestion(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// Function to generate code snippet
async function generateSnippet(apiKey, description, language) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  try {
    //  prompt to ensure the right language
    const prompt = `Generate a ${language} code snippet for the following description: "${description}". Provide only the code, no explanations or additional text. Make sure the code is syntactically correct and follows best practices for ${language}.`;
    const result = await model.generateContent([prompt]);

    const snippet = result.response.text();
    return snippet;
  } catch (error) {
    console.error(`Error generating snippet: ${error.message}`);
    throw error;
  }
}

// Main function to run the CLI
async function main() {
  // First, get the API key
  const apiKey = await getApiKey();

  // Then, ask for snippet details
  const description = await askQuestion('Describe the code snippet you need (e.g., "JWT login"): ');
  const language = await askQuestion('Enter the programming language (e.g., JavaScript, Python, Java): ');
  const fileName = await askQuestion('Enter the file name to save the snippet (e.g., snippet.js): ');

  try {
    const snippet = await generateSnippet(apiKey, description, language);

    // Save the snippet to the specified file
    fs.writeFileSync(fileName, snippet);
    console.log(`Snippet saved to ${fileName}`);
  } catch (error) {
    console.error(`Failed to generate a valid snippet. ${error.message}`);
  }
}

main();
