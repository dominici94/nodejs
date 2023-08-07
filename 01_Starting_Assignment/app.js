// 1. avviare un server node
// 2. scrivere due rotte "/" e "/users": tornare un testo di saluto per / e tornare una lista di dummy users per /users (ul>li>User 1)
// 3. aggiungere un form con un input "username" alla pagina / e submittare una POST request a /create-user con un click button
// 4. Aggiungere la rotta /create-user e parsare i dati provenienti e stamparli in console

const http = require("http");

const dummyUsers = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com" },
];

const server = http.createServer(function (req, res) {
  if (req.url === "/") {
    res.writeHead(200, { "Content-type": "text/html" });

    const html =
      "<html><head><title>HomePage</title></head><body><h2>Ciao, benvenuto nel mio server.</h2><form method='POST' action='/create-user'><input type='text' name='username' placeholder='Inserisci username' /><button type='submit'>INVIA</></form></body></html>";
    res.end(html);
  } else if (req.url === "/users") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const userHtml = dummyUsers
      .map((user) => `<li>${user.name} - ${user.email}</li>`)
      .join("");
    const html = `<html><head><title>Users List</title></head><body><ul>${userHtml}</ul></body></html>`;
    return res.end(html);
  } else if (req.url === "/create-user" && req.method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const username = parsedBody.split("=")[1];
      console.log(username);
    });
    // STATUS CODE 302 REDIRECTION
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  } else {
    res.writeHead(404, { "Content-type": "text/plain" });
    return res.end("Pagina non trovata!");
  }
});

server.listen(3000);
