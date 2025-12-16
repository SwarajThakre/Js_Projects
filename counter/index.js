let counter = document.querySelector("h1");
let minusbtn = document.querySelector("#decrement");
let plusbtn = document.querySelector("#increment");
let resetbtn = document.querySelector("#reset");

function hideMinusButton() {
    const value = parseInt(counter.innerText, 10);
    if (value == 0) {
        minusbtn.style.display = 'none';
    }else {
        minusbtn.style.display = 'inline-block';  
    }
}

minusbtn.addEventListener("click", () => {
  counter.innerText = parseInt(counter.innerText, 10) - 1;
  if (counter.innerText < 0) {
    counter.innerText = 0;
  }
 hideMinusButton();
});

plusbtn.addEventListener("click", () => {
  counter.innerText = parseInt(counter.innerText, 10) + 1;
  hideMinusButton();
}); 

resetbtn.addEventListener("click", () => {
    counter.innerText = 0;
    hideMinusButton();
})

let body = document.querySelector("body");      
body.addEventListener("contextmenu", (e) => {
    e.preventDefault();
});

hideMinusButton();