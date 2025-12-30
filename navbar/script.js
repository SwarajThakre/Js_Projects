let menutbtn = document.querySelector('.menu-btn');
let navlinks = document.querySelector('.nav-links');


menutbtn.addEventListener('click', () => {
  navlinks.classList.toggle('active');
});


navlinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navlinks.classList.remove('active');
  });
});