const http = require("http");
const fs = require("fs");

// function rqListener(req, res) {}

// const server = http.createServer(rqListener);

const server = http.createServer((req, res) => {
  // console.log(req);
  // console.log(req.url, req.method, req.headers);

  // process.exit();
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter Message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='myMessage'><button type='submit'>Send message</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      // console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      // console.log(parsedBody);
      const message = parsedBody.split("=")[1];
      // fs.writeFileSync("messageNew.txt", message);
      fs.writeFile("messageNew.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My first Page</title></head>");
  res.write("<body><h1>Title First Page By Node.js Server</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3000);
