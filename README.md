# AI-Powered Code Snippet Generator

![Version](https://img.shields.io/badge/version-1.0.5-blue) ![License](https://img.shields.io/badge/license-MIT-green)

The **AI-Powered Code Snippet Generator** is a command-line tool that utilizes the Gemini API to generate code snippets based on natural language descriptions. Whether you need a JWT login implementation or any other code sample, this tool simplifies the process by transforming your requirements into actual code.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Key](#api-key)
- [Example](#example)
- [Contributing](#contributing)
- [License](#license)

## Features

- Generate code snippets in various programming languages based on natural language input.
- Supports multiple programming languages such as JavaScript, Python, Java, and more.
- Easy command-line interface with user-friendly prompts.
- Securely stores your API key for seamless future use.

## Installation

To install the package, run (install package Globally):

```bash
npm i aipowered-codegen -g
```

## Usage

- Open any of your project.
- Install the package once globally.
- Enter your Google generative API from [Gemini Developers](https://aistudio.google.com/app/apikey)
- Use command "codegen" for generating snippets.
  
## API Key

You will be prompted to enter your Google Generative AI API key when you run the command for the first time. Ensure that you store it securely, as it is required for generating code snippets.


## Run on Terminal or bash

Run on terminal or on bash using following command
```bash
codegen
```

## Example

```bash
$ codegen
Describe the code snippet you need (e.g., "JWT login"): JWT login
Enter the programming language (e.g., JavaScript, Python): JavaScript
Enter the file name to save the snippet (e.g., snippet.js): jwtLogin.js
```
This will generate a jwtLogin.js file containing the code snippet for JWT login in JavaScript.


## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please fork the repository and submit a pull request. 🤝

## License

[MIT](LICENSE)

