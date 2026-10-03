const API_URL = "http://127.0.0.1:5000/api/stats";

const cpuValue = document.getElementById("cpu-value");
const ramValue = document.getElementById("ram-value");
const storageValue = document.getElementById("storage-value");

const cpuBar = document.getElementById("cpu-bar");
const ramBar = document.getElementById("ram-bar");
const storageBar = document.getElementById("storage-bar");

const uploadValue = document.getElementById("upload-value");
const downloadValue = document.getElementById("download-value");

async function updateStats() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        // CPU
        cpuValue.textContent = `${data.cpu}%`;
        cpuBar.style.width = `${data.cpu}%`;

        // RAM
        ramValue.textContent = `${data.ram}%`;
        ramBar.style.width = `${data.ram}%`;

        // Storage
        storageValue.textContent = `${data.storage}%`;
        storageBar.style.width = `${data.storage}%`;

        // Network
        uploadValue.textContent = `↑ ${data.upload.toFixed(2)} MB/s`;
        downloadValue.textContent = `↓ ${data.download.toFixed(2)} MB/s`;

    } catch (error) {
        console.error("Failed to fetch system stats:", error);

        cpuValue.textContent = "--";
        ramValue.textContent = "--";
        storageValue.textContent = "--";

        uploadValue.textContent = "↑ -- MB/s";
        downloadValue.textContent = "↓ -- MB/s";
    }
}

// Update immediately
updateStats();

// Update every 1 second
setInterval(updateStats, 1000);
