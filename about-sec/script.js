let buttons = document.querySelectorAll('.tab-btn');     
let tabs = document.querySelectorAll('.tab');

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        tabs.forEach(t => t.classList.remove('active'));

        btn.classList.add('active');
        let tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
})