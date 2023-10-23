const { networkInterfaces } = require('os');

module.exports = async (mode = 'dev') => {
  const ip = getIp();
  const port = '5500';
  const src = `https://${ip || '10.0.0'}:${port}`;
  console.log('Server starting at: ', src);
  return { ip, port };
};

function getIp() {
  const nets = networkInterfaces();
  let ip = '';

  Object.keys(nets).some((name) => {
    return nets[name].find((net) => {
      const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4;
      if (net.family === familyV4Value && !net.internal) {
        ip = net.address;
        return ip;
      }
    });
  });

  return ip;
}
