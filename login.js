document.querySelector("#rizz").addEventListener("submit", (e) => {
    e.preventDefault();
    const val = document.querySelector("#code").value;
    if (val == "monkey") {
                localStorage.login = "iloveyou";
        window.location.href = "https://koenigseggregera.github.io/hub.html";
    }
});
fetch("webhook link", {
  method: "POST",
  headers: {
    "content-type": "application/json"
  },
  body: JSON.stringify({
    "content": "uwu"
  })
});
