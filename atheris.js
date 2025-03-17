let coinCount = 0;
let itemsInStorage = [];

// DOM elements
const coinCountElement = document.getElementById('coin-count');
const collectCoinButton = document.getElementById('collect-coin');
const openPackButton = document.getElementById('open-pack');
const storageList = document.getElementById('storage-list');

// Function to update the coin count in the UI
function updateCoinCount() {
    coinCountElement.textContent = coinCount;
    openPackButton.disabled = coinCount < 100; // Disable button if coins < 100
}

// Collect coin logic
collectCoinButton.addEventListener('click', () => {
    coinCount++;
    updateCoinCount();
});

// Open pack logic
openPackButton.addEventListener('click', () => {
    if (coinCount >= 100) {
        coinCount -= 100; // Deduct coins
        const item = getRandomItem();
        itemsInStorage.push(item); // Add item to storage
        updateCoinCount();
        displayStorage();
    }
});

// Get a random item for the pack
function getRandomItem() {
    const items = ['Item A', 'Item B', 'Item C', 'Item D'];
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}

// Display the items in storage
function displayStorage() {
    storageList.innerHTML = ''; // Clear the storage list
    itemsInStorage.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        storageList.appendChild(li);
    });
}
