let previousElement = null;

function handleMouseOver(event) {
    // clearing backtrack
    if (previousElement) previousElement.style.outline = "";

    // adding highlight
    event.target.style.outline = "2px solid blue";

    // updates previousElement
    previousElement = event.target;
}

function handleClick(event) {
    // temporary evade target's browser and webpage events
    event.preventDefault();
    event.stopPropagation();
    
    const element = event.target;

    // domain expansion!!
    element.style.setProperty(
        "height",
        `${element.scrollHeight}px`,
        "important"
    );

    console.log("Expanded height:", element.style.height);

    // cleaning up
    document.removeEventListener("click", handleClick, true);
    document.removeEventListener("mouseover", handleMouseOver);
}

document.addEventListener("mouseover", handleMouseOver);
document.addEventListener("click", handleClick, true);