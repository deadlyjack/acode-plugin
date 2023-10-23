/* eslint-disable no-console */
const { spawn } = require('child_process');
const path = require('path');

const webpack = spawn('npx', ['webpack', '--mode=development', '--watch'], { cwd: path.resolve(__dirname, '../') });

webpack.on('error', (webpackError) => {
  if (webpackError) {
    console.error(webpackError);
    process.exit(1);
  }
});

webpack.stdout.on('data', (chunk) => {
  const stdout = chunk.toString();
  console.log(stdout);
  process.send(stdout);
});

webpack.stdout.on('error', (error) => {
  console.log(error);
});

webpack.stderr.on('data', (chunk) => {
  const stderr = chunk.toString();
  console.log(stderr);
});
