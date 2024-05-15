const { error } = require("console");
const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // Solution 1
  // fs.readFile("test-file.txt", "utf-8", (error, data) => {
  //   if (error) console.log(error);
  //   res.end(data);
  // });
  // Solution 2
  // const readable = fs.createReadStream("test-filee.txt");
  // readable.on("data", (chunk) => {
  //   res.write(chunk);
  // });
  // readable.on("end", () => {
  //   res.end();
  // });
  // readable.on("error", (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end("file not found");
  // });
  // Solution 3
  const readable = fs.createReadStream("test-filee.txt");

  readable.pipe(res);
  // REadableScource.pipe(writableData)
});

server.listen(8000, "127.0.0.1", () => {
  console.log("server started");
});
