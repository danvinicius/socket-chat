const socket = io("http://localhost:8081");

socket.on("connect", () => {
  //console.log("Usuário conectou");
});

const chat = document.getElementById("chat");

function enviarMsg() {
  const msg = document.getElementById("msg");
  const nome = document.getElementById("nome");
  socket.emit("msg", { msg: msg.value, nome: nome.value });
  msg.value = "";
  msg.focus();
}

socket.on("result", (data) => {
  const msgP = document.createElement("p");

  if (socket.id == data.id) {
    msgP.className = "msg myMsg";
    msgP.innerHTML = `${data.msg}`;
  } else {
    msgP.className = "msg theirMsg";
    msgP.innerHTML = `<b>${data.nome}:</b> ${data.msg}`;
  }
  chat.appendChild(msgP);
});

socket.on("disconnect", () => {
  //console.log("Desconectado");
});
