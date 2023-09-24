// Mendapatkan elemen dengan ID "user-name"
const userNameElement = document.getElementById("user-name");

// Daftar warna yang akan digunakan untuk nama pengguna
const userColors = ["#ff5733", "#33ff57", "#5733ff", "#ff33ab"];

//Warna acak
const randomColor = userColors[Math.floor(Math.random() * userColors.length)];

//Warna teks nama pengguna
userNameElement.style.color = randomColor;

const socket = io();
const messageContainer = document.getElementById("message-container");
const messageInput = document.getElementById("message-input");
const roomIDElement = document.getElementById("room-id");
const userNameElement = document.getElementById("user-name");

// Fungsi ScrollBar
function scrollToBottom() {
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// Event listener saat halaman dimuat
window.addEventListener("load", () => {
    scrollToBottom(); // Menggulir ke bawah saat halaman dimuat
});

// Event listener saat ada pesan baru
socket.on("chatMessage", () => {
    scrollToBottom(); // Menggulir ke bawah saat ada pesan baru
});

const params = new URLSearchParams(window.location.search);
const roomID = params.get("roomID");
const userName = params.get("userName");

// Menampilkan ID ruang dan nama pengguna
roomIDElement.textContent = roomID;
userNameElement.textContent = userName;

// Fungsi untuk mengirim pesan
function sendMessage() {
    const message = messageInput.value;
    if (message.trim() !== "") {
        const fullMessage = `${userName}: ${message}`;
        socket.emit("chatMessage", {
            roomID,
            message: fullMessage
        });
        messageInput.value = "";
    }
}

// Event listener untuk tombol Kirim
document.getElementById("send-button").addEventListener("click", () => {
    sendMessage();
});

// Event listener untuk tombol Enter
messageInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        sendMessage();
    }
});

// Fungsi untuk mengelola pesan yang diterima
function appendMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.textContent = message;
    messageContainer.appendChild(messageElement);
}

// Bergabung ke ruang chat
socket.emit("joinRoom", {
    roomID,
    userName
});

// Mendengarkan pesan yang diterima
socket.on("chatMessage", (data) => {
    appendMessage(data.message);
});