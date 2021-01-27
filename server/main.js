
const dgram = require('dgram');
const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
    const data = msg.toString('hex');
  console.log(`server got: ${data} from ${rinfo.address}:${rinfo.port}`);
  const packetId = data.substring(10,12);
  const numberOfData = data.substring(48,50);
  const responseAck = packetId + numberOfData;
  server.send(Buffer.from(responseAck,'hex'),0,2,rinfo.port,rinfo.address);
  console.log(packetId, numberOfData);
  console.log(responseAck);
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(52000);
// Prints: server listening 0.0.0.0:41234