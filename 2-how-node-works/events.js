const EventEmitter = require("events");
const http = require("http");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}
const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("there was a new sale");
});

myEmitter.on("newSale", () => {
  console.log("costumer name varun");
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are Now ${stock} items left in stock.`);
});

myEmitter.emit("newSale", 9);

/////////////////////////////////

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("request received");
  res.end("request Recevied");
});
server.on("request", (req, res) => {
  console.log("Another request Recevied");
});

server.on("close", () => {
  console.log("server closed");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("waiting for request");
});
