const dropArea = document.getElementById('drop-area');
const fileInput = document.getElementById('file-input');
const preview = document.getElementById('preview');
const clearBtn = document.getElementById('clear-images');

// Load images from localStorage on page load
document.addEventListener('DOMContentLoaded', loadImages);

// Handle file selection
dropArea.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (event) => handleFile(event.target.files[0]));

// Drag & Drop functionality
dropArea.addEventListener('dragover', (event) => {
    event.preventDefault();
    dropArea.style.backgroundColor = '#d4e4ff';
});
dropArea.addEventListener('dragleave', () => {
    dropArea.style.backgroundColor = '#e9f2ff';
});
dropArea.addEventListener('drop', (event) => {
    event.preventDefault();
    dropArea.style.backgroundColor = '#e9f2ff';
    let file = event.dataTransfer.files[0];
    handleFile(file);
});

// Function to handle file and store it
function handleFile(file) {
    if (file && file.type.startsWith('image/')) {
        let reader = new FileReader();
        reader.onload = () => {
            saveImage(reader.result);
            displayImage(reader.result);
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please upload a valid image file.');
    }
}

// Save images to localStorage
function saveImage(imageData) {
    let images = JSON.parse(localStorage.getItem('images')) || [];
    images.push(imageData);
    localStorage.setItem('images', JSON.stringify(images));
}

// Load images from localStorage
function loadImages() {
    let images = JSON.parse(localStorage.getItem('images')) || [];
    images.forEach(imageData => displayImage(imageData));
}

// Display image in preview section
function displayImage(imageData) {
    let imgElement = document.createElement('img');
    imgElement.src = imageData;
    preview.appendChild(imgElement);
}

// Clear all images
clearBtn.addEventListener('click', () => {
    localStorage.removeItem('images');
    preview.innerHTML = '';
});
