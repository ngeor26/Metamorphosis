const bgaudio = document.querySelector("#bg");

function goToPage(url) {
    // Pass the current audio time as URL param
    const currentTime = bgaudio.currentTime.toFixed(2);
    const separator = url.includes("?") ? "&" : "?";
    window.location.href = `${url}${separator}bgTime=${currentTime}`;
}

document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector("video");

    bgaudio.volume = 0.1;
    const params = new URLSearchParams(window.location.search);
    const bgTime = params.get("bgTime");

    if (bgTime) {
        bgaudio.currentTime = parseFloat(bgTime);
    }

    bgaudio.play();

    const popupsContainer = document.getElementById("popups");
    const endButtons = document.getElementById("end-buttons");

    if (!pageEvents || !Array.isArray(pageEvents)) {
        console.warn("No pageEvents defined for this page!");
        return;
    }

    // Create popup elements dynamically
    pageEvents.forEach((e) => {
        if (!document.getElementById(e.id)) {
            const p = document.createElement(e.id === "p38" ? "div" : "p");
            p.id = e.id;
            p.className = e.id === "p38" ? "thesis" : "popup";
            popupsContainer.appendChild(p);
        }
    });

    // Update popups based on video time
    video.addEventListener("timeupdate", () => {
        const t = video.currentTime;
        pageEvents.forEach((e) => {
            const el = document.getElementById(e.id);
            if (t >= e.time) {
                el.innerHTML = e.text;
                el.classList.add("show");
            } else {
                el.classList.remove("show");
                el.innerHTML = "";
            }
        });
    });

    // Show end buttons when video ends
    video.addEventListener("ended", () => {
        endButtons.style.display = "block";
    });

    let currentPage = parseInt(params.get("page")) || 1;
    const totalPages = 8;
    const progressBar = document.getElementById("progress-bar");
    const progressPercent = (currentPage / totalPages) * 100;
    progressBar.style.width = progressPercent + "%";
});
