function makeDraggable(dragArea, draggableBox) {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    dragArea.addEventListener("mousedown", (e) => {
        isDragging = true;
        const rect = draggableBox.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
        draggableBox.style.cursor = "grabbing";
        document.body.style.userSelect = "none";
    });

    document.addEventListener("mousemove", (e) => {
        if (isDragging) {
            const x = e.clientX - offsetX;
            const y = e.clientY - offsetY;
            draggableBox.style.left = `${x}px`;
            draggableBox.style.top = `${y}px`;
            draggableBox.style.transform = "none";
        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        draggableBox.style.cursor = "grab";
        document.body.style.userSelect = "auto";
    });
}

makeDraggable(document.querySelector("#settingsbox .fix-flex"), document.getElementById("settingsbox"));
makeDraggable(document.querySelector("#appstore .fix-flex"), document.getElementById("appstore"));
makeDraggable(document.querySelector("#browser .fix-flex"), document.getElementById("browser"));

const settingsBox = document.getElementById("settingsbox");
const appstore = document.getElementById("appstore");
const browser = document.getElementById("browser");

function createCircle() {
    const circle = document.createElement('div');
    circle.classList.add('circle');
    
    const randomX = Math.random() * 100 - 50 + 'vw';
    const randomY = Math.random() * -200 - 50 + 'px';

    circle.style.setProperty('--random-x', randomX);
    circle.style.setProperty('--random-y', randomY);
    
    document.querySelector('.bottombar').appendChild(circle);
    
    setTimeout(() => {
        circle.remove();
    }, 6000);
}

setInterval(createCircle, 200);
