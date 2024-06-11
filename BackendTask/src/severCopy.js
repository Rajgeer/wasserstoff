const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Backend servers
const servers = [
  { url: 'http://localhost:4001', weight: 1 },
  { url: 'http://localhost:4002', weight: 2 },
];

let currentServerIndex = 0;

// Simple round-robin load balancing
function getNextServer() {
  const server = servers[currentServerIndex];
  currentServerIndex = (currentServerIndex + 1) % servers.length;
  return server;
}

// Complex routing based on request path
function getServerByPath(path) {
  if (path.startsWith('/special')) {
    return servers[1]; // Always route to the second server for /special paths
  }
  return getNextServer();
}

app.use(async (req, res) => {
  const server = getServerByPath(req.path);
  try {
    const response = await axios({
      method: req.method,
      url: `${server.url}${req.url}`,
      data: req.body,
      headers: req.headers,
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error connecting to backend server');
  }
});

app.listen(PORT, () => {
  console.log(`Load balancer running on http://localhost:${PORT}`);
});
