<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Dibor Chat App - README</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      padding: 2rem;
      max-width: 800px;
      margin: auto;
      background-color: #f9f9f9;
      color: #333;
    }
    h1, h2 {
      color: #2c3e50;
    }
    a {
      color: #007BFF;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    code {
      background-color: #eee;
      padding: 2px 6px;
      border-radius: 4px;
      font-family: monospace;
    }
    pre {
      background-color: #eee;
      padding: 10px;
      border-radius: 5px;
      overflow-x: auto;
    }
  </style>
</head>
<body>

  <h1>Dibor Chat App</h1>
  <p><strong>Dibor</strong> is a real-time web chat application that lets users send and receive messages instantly.
    It supports one-on-one conversations, user authentication, and live chat updates using Socket.IO.</p>

  <h2>🚀 Live Demo</h2>
  <p><a href="https://dibor-web.onrender.com" target="_blank">TRY IT YOURSELF: dibor-web.onrender.com</a></p>

  <h2>🛠️ Tech Stack</h2>
  <ul>
    <li><strong>Frontend:</strong> React, React Bootstrap, Socket.IO Client</li>
    <li><strong>Backend:</strong> Node.js, Express, MongoDB, Socket.IO</li>
    <li><strong>Database:</strong> MongoDB Atlas</li>
  </ul>

  <h2>✨ Features</h2>
  <ul>
    <li>User authentication with JWT token (signup & login)</li>
    <li>Start new chat or continue old ones</li>
    <li>Real-time messaging with Socket.IO</li>
    <li>Responsive design with Bootstrap</li>
    <li>Profile picture support</li>
  </ul>

  <h2>📦 Getting Started</h2>
  <h3>Clone the Repository</h3>
  <pre><code>git clone https://github.com/amithazan1/dibor-Web.git</code></pre>

  <h3>Frontend</h3>
  <pre><code>cd dibor-Web/dibor
npm install
npm run dev</code></pre>

  <h3>Backend</h3>
  <pre><code>cd dibor-Web/backend
npm install
npm run server</code></pre>

  <p>Make sure you have a `.env` file configured with your MongoDB URI and other secrets.</p>

  <h2>📁 Project Structure</h2>
  <ul>
    <li><code>frontend/</code> – React frontend</li>
    <li><code>backend/</code> – Node.js/Express backend</li>
    <li><code>socket.js</code> – Real-time messaging logic</li>
  </ul>

  <h2>📬 Contact</h2>
  <p>Created by <strong>Amit Hazan</strong> – Feel free to reach out or contribute on <a href="https://github.com/amithazan1">GitHub</a>!</p>

</body>
</html>
