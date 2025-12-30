const container = document.querySelector(".container");
const button = document.getElementById("button");
const h1 = document.getElementById("color");

function getRandomColor() {
    let letters = "0123456789ABCDEF";
    let colors = "#";

    for (let i = 0; i < 6; i++) {
        colors += letters[Math.floor(Math.random() * 16)];
    }
    return colors;
}

button.addEventListener("click", function() {
    let color = getRandomColor();
    container.style.backgroundColor = color;
    console.log(color);
    h1.innerText = `Background Color: ${color}`;
    
})