/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const liveServer = require('live-server');
const getNet = require('./getNet');

const serverCrt = path.resolve(__dirname, 'server.crt');
const serverKey = path.resolve(__dirname, 'server.key');

main();

async function main() {
  const { ip: host, port } = await getNet('dev');
  process.cwd = () => __dirname;
  liveServer.start({
    open: false,
    port,
    host,
    cors: true,
    root: '../',
    ignore: 'node_modules,platforms,plugins',
    file: 'index.html',
    https: {
      cert: fs.readFileSync(serverCrt),
      key: fs.readFileSync(serverKey),
      passphrase: '1234',
    },
    middleware: [(req, res, next) => {
      const url = req.originalUrl;
      const www = '../platforms/android/app/src/main/assets/www/';

      if (url === '/cordova.js') {
        const file = path.resolve(__dirname, www, 'cordova.js');
        sendFile(res, file);
        return;
      }

      if (url === '/cordova_plugins.js') {
        const file = path.resolve(__dirname, www, 'cordova_plugins.js');
        sendFile(res, file);
        return;
      }

      next();
    }],
  });

  process.send('OK');
}

function sendFile(res, filePath) {
  if (fs.existsSync(filePath)) {
    const stat = fs.statSync(filePath);

    res.writeHead(200, {
      'Content-Type': 'application/javascript',
      'Content-Length': stat.size,
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end(`ERROR cannot get ${filePath}`);
}
