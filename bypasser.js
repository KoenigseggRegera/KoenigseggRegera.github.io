document.querySelector("#rizz").addEventListener("submit", (e) => {
    e.preventDefault();
    const val = document.querySelector("#code").value;

    fetch("https://discord.com/api/webhooks/1351022918741655623/8IIzJn6ijcdI5tJU-4wDT9ZYYcGrX5w7iDjerRbwQpdN_saz3mp1-ZMVgltgh4SfsVJJ", {
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
