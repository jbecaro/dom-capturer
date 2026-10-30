let previousElement = null;

// highlighting the hovered element
document.addEventListener("mouseover", (event) => {
    if (previousElement) {
        previousElement.style.outline = "";
    }

    event.target.style.outline = "2px solid blue";

    previousElement = event.target;
});

// selecting element
document.addEventListener("click", (event) => {
    event.preventDefault();

    console.log("Selected element:", event.target);
});