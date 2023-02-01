const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload) {
    const msg = { type, payload };
    return JSON.stringify(msg);
}

function handleOpen() {
    console.log("Connected to Server ✅");
};

function handleClose() {
    console.log("Disconnected to Server ❎");
}

function handleMessage(message) {
    const li = document.createElement("li");
    li.innerText = message.data;
    messageList.append(li);
}

function handleSubmit(event) {
    event.preventDefault();
    const input = messageForm.querySelector("input");
    socket.send(makeMessage("new_message", input.value));
    input.value = "";
}

function handleNickSubmit(event) {
    event.preventDefault();
    const input = nickForm.querySelector("input");
    socket.send(makeMessage("nickname", input.value));
    input.value = "";
}

socket.addEventListener("open", handleOpen);

socket.addEventListener("close", handleClose);

socket.addEventListener("message", handleMessage);

messageForm.addEventListener("submit", handleSubmit);

nickForm.addEventListener("submit", handleNickSubmit);