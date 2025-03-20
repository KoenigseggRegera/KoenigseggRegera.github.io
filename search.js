import { blooks, rarities } from "./utils.js";

const dq = document.querySelector.bind(document);

const want = new URLSearchParams(window.location.search).get("q");

async function main () {
    const req = await fetch("/api/search", {
        body: want,
        method: "POST"
    });
    const res = await req.json();

    var ubl = [];
    for (const blook of Object.entries(res))
        ubl.push(blook[0]);

    ubl.sort((a, b) => rarities[blooks[a].rarity] - rarities[blooks[b].rarity]);

    for (const blook of ubl) {
        dq("#results").innerHTML += `<a href="/item/${blook}" class="${blooks[blook].rarity}Text">${blook} - ${res[blook]}</a><br>`;
        
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

main();