import net from "net";

const clients = [];
const maxClients = 100000;

for (let i = 0; i < maxClients; i++) {
  const client = net.createConnection({ port: 3000 }, () => {
    console.log(`Client ${i} connected`);
  });

  client.on("error", (err) => {
    console.error(`Client ${i} error:`, err);
    console.log(`接続エラーが発生しました。`);
    process.exit(1);
  });

  clients.push(client);
}
