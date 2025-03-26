// List of images with captions
const images = [
    { filename: "image1.jpg", caption: "Beautiful Sunset" },
    { filename: "image2.jpg", caption: "Mountain View" },
    { filename: "image3.jpg", caption: "Ocean Waves" }
];

const gallery = document.getElementById("gallery");

// Loop through images and add them to the gallery
images.forEach(image => {
    const container = document.createElement("div");
    container.classList.add("image-container");

    const imgElement = document.createElement("img");
    imgElement.src = `images/${image.filename}`;
    imgElement.alt = image.caption;

    const captionElement = document.createElement("p");
    captionElement.innerText = image.caption;

    container.appendChild(imgElement);
    container.appendChild(captionElement);
    gallery.appendChild(container);
});
