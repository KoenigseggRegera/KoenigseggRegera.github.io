let coinCount = 0;
const coinCountElement = document.getElementById('coinCount');
const collectButton = document.getElementById('collectButton');
const openPackButton = document.getElementById('openPackButton');
const packPriceElement = document.getElementById('packPrice');
const packMessageElement = document.getElementById('packMessage');

// Collect coins when the user clicks the collect button
collectButton.addEventListener('click', () => {
    coinCount++;
    coinCountElement.textContent = coinCount;
});

// Open a pack when the user clicks the open pack button
openPackButton.addEventListener('click', () => {
    const packPrice = 10; // Price of one pack
    if (coinCount >= packPrice) {
        // Deduct coins for opening a pack
        coinCount -= packPrice;
        coinCountElement.textContent = coinCount;
        packMessageElement.textContent = `You opened a pack! You now have ${coinCount} coins.`;
    } else {
        packMessageElement.textContent = "Not enough coins to open a pack!";
    }
});
