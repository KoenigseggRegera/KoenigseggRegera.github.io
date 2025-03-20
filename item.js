import { blooks, rarities } from "./utils.js";

const dq = document.querySelector.bind(document);

const blook = decodeURIComponent(window.location.pathname.split("/")[2]);

async function main () {
    var image_url = `https://blacket.org${blooks[blook].image}`;

    if (blooks[blook].image.startsWith("https"))
        image_url = blooks[blook].image;
    
    dq("#blookIMG").src = image_url;
    dq("#name").innerText = blook;

    const req = await fetch("/api/item", {
        body: JSON.stringify({
            blook: blook
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const res = await req.json();

    dq("#lsp").innerHTML = res.lastSalePrice;
    dq("#llp").innerHTML = res.lowestListedPrice;
    dq("#rap").innerHTML = res.recentAveragePrice;
    dq("#val").innerHTML = res.value;
    dq("#vn").innerHTML = res.valueNotes;
}

dq("#search").addEventListener("submit", (e) => {
    e.preventDefault();

    var opt = dq("#search-opt").value;
    var val = dq("#search-val").value;

    if (opt == "user")
        window.location.href = `/user/${val}`;
    else if (opt == "blook")
        window.location.href = `/search?q=${val}`;
})

main();