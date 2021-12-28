const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("msg", (data) => {
    if (
      data.msg.trim() == "" ||
      data.msg.trim() == undefined ||
      data.nome.trim() == "" ||
      data.nome.trim() == undefined
    ) {
      return;
    } else {
      io.emit("result", {
        nome: data.nome.trim(),
        msg: data.msg.trim(),
        id: socket.id,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("Desconectado");
  });
});

let PORT = 8081;
http.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});
