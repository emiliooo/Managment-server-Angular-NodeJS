const express = require('express');
const app = express();
const PORT = 4454;
const servers = require('./servers.json');
const ONLINE = 'ONLINE';
const OFFLINE = 'OFFLINE';
const REBOOTING = 'REBOOTING';

app.get('/servers', (req, res) => {
  res.send(servers);
});

app.get('/servers/:serverId', (req, res) => {
  const foundServer = findServer(req, res);

  res.send(foundServer);
});

app.put('/servers/:serverId/on', (req, res) => {
  const foundServer = findServer(req, res);

  if (foundServer.status !== OFFLINE) {
    return res.status(400).send({errorMessage: `Server is not offline`});
  }

  foundServer.status = ONLINE;
  res.send(foundServer);
});

app.put('/servers/:serverId/off', (req, res) => {
  const foundServer = findServer(req, res);

  if (foundServer.status !== ONLINE) {
    return res.status(400).send({errorMessage: `Server is not online`});
  }

  foundServer.status = OFFLINE;
  res.send(foundServer);
});

app.put(`/servers/:serverId/reboot`, (req, res) => {
  const foundServer = findServer(req, res);

  if (foundServer.status !== ONLINE) {
    return res.status(400).send({errorMessage: `Server is not online`});
  }

  foundServer.status = REBOOTING;
  setInterval(() => {
    foundServer.status = ONLINE;
  }, getRandomTime(1000, 5000));

  res.send(foundServer);
});

function findServer(req, res) {
  const serverId = parseInt(req.params.serverId);

  const foundServer = servers.find(it => it.id === serverId);
  if (!foundServer) {
    throw res.status(404).send({errorMessage: `Server does not exist`});
  }
  return foundServer
}

function getRandomTime(min, max) {
  return Math.random() * (max - min) + min;
}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
