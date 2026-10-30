let previousElement = null;

document.addEventListener("mouseover", (event) => {
    if (previousElement) {
        previousElement.style.outline = "";
    }

    event.target.style.outline = "2px solid blue";

    previousElement = event.target;
});