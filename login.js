document.querySelector("#rizz").addEventListener("submit", (e) => {
    e.preventDefault();
    const val = document.querySelector("#code").value;
    if (val == "balling") {
        window.location.href = "https://koenigseggregera.github.io/hub.html";
    }
});
