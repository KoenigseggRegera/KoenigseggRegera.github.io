import { blooks, rarities } from "./utils.js";

const dq = document.querySelector.bind(document);
const name = window.location.pathname.split("/")[2];

var tmode = false;

async function main () {
    dq("#textBlooks").style.display = "none";
    const req = await fetch("/api/user", {
        body: name,
        method: "POST"
    });
    const res = await req.json();

    dq("#name").innerHTML = res.name;
    dq("#tc").innerHTML = "Tokens: " + res.tokens;

    var ubl = [];
    for (const blook of Object.entries(res.blooks)) {
        ubl.push(blook[0]);
        console.log(blook[0]);
        console.log(rarities[blooks[blook[0]].rarity]);
    }

    ubl.sort((a, b) => rarities[blooks[a].rarity] - rarities[blooks[b].rarity]);

    console.log(ubl);
    
    for (const blook of ubl) {
        var image_url = `https://blacket.org${blooks[blook].image}`;
        
        if (blooks[blook].image.startsWith("https"))
            image_url = blooks[blook].image;
        
        dq("#blooks").innerHTML += `<a href="/item/${blook}"><div class="blook ${blooks[blook].rarity}">
    <div class="blook-wrapper">
        <img class="blook-img" src="${image_url}" height="60px"><br>
        <span class="blook-desc">${res.blooks[blook]}x ${blook}</span>
    </div>
</div></a>`;
        
        dq("#textBlooks").innerHTML += `<div class="${blooks[blook].rarity}Text">
    ${blook} - ${res.blooks[blook]}
</div>`;
    }
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

dq("#mode").addEventListener("click", () => {
    if (!tmode) {
        tmode = true;
        dq("#mode").innerHTML = "Blook mode";
        dq("#blooks").style.display = "none";
        dq("#textBlooks").style.display = "block";
    } else {
        tmode = false;
        dq("#mode").innerHTML = "Text mode";
        dq("#blooks").style.display = "block";
        dq("#textBlooks").style.display = "none";
    }
})

main();