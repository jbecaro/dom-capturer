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

    // cleaning up
    document.removeEventListener("click", handleClick, true);
    document.removeEventListener("mouseover", handleMouseOver);

    // sending data
    const rect = element.getBoundingClientRect();
    chrome.runtime.sendMessage({
        type: "ELEMENT_SELECTED",
        rect: {
            x: rect.x + window.scrollX,
            y: rect.y + window.scrollY,
            width: rect.width,
            height: rect.height
        }
    });
}

document.addEventListener("mouseover", handleMouseOver);
document.addEventListener("click", handleClick, true);