let previousElement = null;

function handleMouseOver(event) {
    // clearing backtrack
    if (previousElement) previousElement.style.outline = "";

    // adding highlight
    event.target.style.outline = "2px solid blue";

    // updates previousElement
    previousElement = event.target;
}

document.addEventListener("mouseover", handleMouseOver);