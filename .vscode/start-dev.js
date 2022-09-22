/* eslint-disable no-console */
const { fork, spawn } = require('child_process');
const path = require('path');

main();

async function main() {
  let serverStarted = false;
  console.log('+--------------+');
  console.log('| Starting dev |');
  console.log('+--------------+');
  const webpack = fork(path.resolve(__dirname, './run-webpack.js'));
  webpack.on('message', (chunk) => {
    if (!serverStarted && chunk.search(/compiled\ssuccessfully/)) {
      startServer();
      serverStarted = true;
    }
  });

  webpack.on('error', (err) => {
    console.log('WEBPACK ERROR', err);
    webpack.kill(1);
    process.exit(1);
  });
}

async function startServer() {
  const server = fork(path.resolve(__dirname, './start-server.js'));
  server.on('error', (err) => {
    console.log('SERVER ERROR', err);
    server.kill(1);
    process.exit(1);
  });
}
