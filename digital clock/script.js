let clock = document.getElementById('clock');

function digClock(){
    let time = new Date();
    let h = time.getHours();
    let m = time.getMinutes();
    let s = time.getSeconds();
    let ampm = h >= 12  ? 'PM' : 'AM'; // Determine AM/PM

    h = h % 12; // Convert to 12-hour format
    h = h ? h : 12;
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;

    clock.innerText = `${h} : ${m} : ${s} ${ampm}`;
    setTimeout(digClock, 1000);
}

digClock();