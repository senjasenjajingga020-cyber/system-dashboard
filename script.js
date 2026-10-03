const API_URL = "http://127.0.0.1:5000/api/stats";

const cpuValue = document.getElementById("cpu-value");
const ramValue = document.getElementById("ram-value");
const storageValue = document.getElementById("storage-value");

const cpuBar = document.getElementById("cpu-bar");
const ramBar = document.getElementById("ram-bar");
const storageBar = document.getElementById("storage-bar");

const uploadValue = document.getElementById("upload-value");
const downloadValue = document.getElementById("download-value");

const status = document.getElementById("status");


async function updateStats() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();


        /* ========================================
           CPU
        ======================================== */

        cpuValue.textContent = `${data.cpu}%`;
        cpuBar.style.width = `${data.cpu}%`;


        /* ========================================
           RAM
        ======================================== */

        ramValue.textContent = `${data.ram}%`;
        ramBar.style.width = `${data.ram}%`;


        /* ========================================
           STORAGE
        ======================================== */

        storageValue.textContent = `${data.storage}%`;
        storageBar.style.width = `${data.storage}%`;


        /* ========================================
           NETWORK
        ======================================== */

        uploadValue.textContent =
            `↑ ${Number(data.upload).toFixed(2)} MB/s`;

        downloadValue.textContent =
            `↓ ${Number(data.download).toFixed(2)} MB/s`;


        /* ========================================
           STATUS
        ======================================== */

        status.textContent = "● Online";


    } catch (error) {

        console.error(
            "Failed to fetch system stats:",
            error
        );


        /* Show disconnected state */

        cpuValue.textContent = "--%";
        ramValue.textContent = "--%";
        storageValue.textContent = "--%";

        cpuBar.style.width = "0%";
        ramBar.style.width = "0%";
        storageBar.style.width = "0%";

        uploadValue.textContent = "↑ -- MB/s";
        downloadValue.textContent = "↓ -- MB/s";

        status.textContent = "● Offline";
    }
}


/* ========================================
   FIRST UPDATE
======================================== */

updateStats();


/* ========================================
   UPDATE EVERY 1 SECOND
======================================== */

setInterval(updateStats, 1000);
