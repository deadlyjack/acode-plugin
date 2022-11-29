const { networkInterfaces } = require('os');

module.exports = async (mode = 'dev') => {
  const { WiFi, Ethernet } = getIp();
  const [ip] = WiFi || Ethernet;
  const port = '5500';
  const src = `https://${ip || '10.0.0'}:${port}`;
  console.log('Server starting at: ', src);
  return { ip, port };
};

function getIp() {
  const nets = networkInterfaces();
  const results = {}; // Or just '{}', an empty object

  Object.keys(nets).forEach((name) => {
    nets[name].forEach((net) => {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
      const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4;
      if (net.family === familyV4Value && !net.internal) {
        if (!results[name]) {
          results[name] = [];
        }
        results[name].push(net.address);
      }
    });
  });
  return results;
}
