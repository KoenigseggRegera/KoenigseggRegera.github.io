import { blooks, rarities } from "./utils.js";

const dq = document.querySelector.bind(document);

function convert (unix) {
    const localTime = new Date(unix * 1000);

    const options = { 
      month: '2-digit', 
      day: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true
    };

    return localTime.toLocaleString(undefined, options);
}

async function main () {
    const req = await fetch("/api/sales?limit=100");
    const res = await req.json();

    for (var idx = 99; idx >= 0; idx--) {
        var cur = res[idx];

        // dq("#sales").innerHTML += `<span class="${blooks[cur.blook].rarity}Text">[${convert(cur.time)}] ${cur.blook} ${cur.amount}</span><br>`;
        dq("#sales").innerHTML += `<tr class="${blooks[cur.blook].rarity}Text">
    <td>${convert(cur.time)}</td>
    <td><a href="/item/${cur.blook}">${cur.blook}</a></td>
    <td>${cur.amount}</td>
</tr>`;
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
});

dq("#lastamt").addEventListener("input", async () => {
    var val = dq("#lastamt").value;
    
    const req = await fetch(`/api/sales?limit=${val}`);
    const res = await req.json();

    dq("#sales").innerHTML = "";
    for (var idx = res.length - 1; idx >= 0; idx--) {
        var cur = res[idx];

        dq("#sales").innerHTML += `<tr class="${blooks[cur.blook].rarity}Text">
    <td>${convert(cur.time)}</td>
    <td><a href="/item/${cur.blook}">${cur.blook}</a></td>
    <td>${cur.amount}</td>
</tr>`;
    }
});

main();