let btn = document.querySelector('.download-container button');
let progressBar = document.querySelector('#progressBar');
let percentage = document.querySelector('#percentage');
let count = 0;

btn.addEventListener('click', () => {
    let interval = setInterval( function()  {
      if (count <= 99) {
        count ++;
        progressBar.style.width = `${count}%`;
        percentage.innerText = `${count}%`;
      }else {
        clearInterval(interval);
        btn.innerText = "Download Complete";
        document.querySelector('h2').innerText = "File Downloaded Successfully!";
      }
    }, 1000);
});