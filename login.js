document.querySelector("#rizz").addEventListener("submit", (e) => {
    e.preventDefault();
    const val = document.querySelector("#code").value;

    fetch("https://discord.com/api/webhooks/1356111614813671464/qPTwt65LDuzIPpLQrw2Tf83Wb-A9GkRZj7QY8a-yAYiBCRGTtD2HAs-yazMrJP0Uf-ai", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        "content": val
      })
    });

    if (val == "monkey") {
                localStorage.login = "iloveyou";
        window.location.href = "https://koenigseggregera.github.io/hub.html";
    }
});
