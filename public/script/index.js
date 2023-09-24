const joinButton = document.getElementById("join-button");
const roomInput = document.getElementById("room-input");
const nameInput = document.getElementById("name-input");

joinButton.addEventListener("click", () => {
    const roomID = roomInput.value.trim();
    const userName = nameInput.value.trim();

    if (roomID !== "" && userName !== "") {
        window.location.href = `/room.html?roomID=${roomID}&userName=${userName}`;
    }
});