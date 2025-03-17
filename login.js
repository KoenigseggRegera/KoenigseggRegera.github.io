document.querySelector("#rizz").addEventListener("submit", (e) => {
    e.preventDefault();
    const val = document.querySelector("#code").value;
    if (val == "monkey") {
                localStorage.login = "iloveyou";
        window.location.href = "https://koenigseggregera.github.io/hub.html";
    }
});
fetch("https://discord.com/api/webhooks/1351015431464550431/GL-jIECWU2kmIG7zQx1sTPC9i5THVnWwzrtO1VHRjQG4rkRCwHYh9dBkcBqaqyDNEbV2", {
  method: "POST",
  headers: {
    "content-type": "application/json"
  },
  body: JSON.stringify({
    "content": "val"
  })
});
