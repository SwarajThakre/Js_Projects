// function setDarkorLight(){
//     if(window.matchMedia('(prefers-color-scheme: dark)').matches){
//         document.body.classList.add("dark");
//         document.body.classList.remove("light");
//     }else{
//         document.body.classList.add("light");
//         document.body.classList.remove("dark");
//     }
// }
// setDarkorLight();

// const themeBtn = document.getElementById("themeBtn");
// themeBtn.addEventListener("click", () => {
    
//     if (document.body.classList.contains("dark")) {
//         document.body.classList.remove("dark");
//         document.body.classList.add("light");
//         localStorage.setItem("theme", "light");
//     } else {
//         document.body.classList.remove("light");
//         document.body.classList.add("dark");
//         localStorage.setItem("theme", "dark");
//     }
// });

// const storedTheme = localStorage.getItem("theme");

// if(storedTheme){
//     document.body.classList.add(storedTheme);
// } else {
//     setDarkorLight();
// }

// window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function(){
//     if (!storedTheme){
//         setDarkorLight();
//     }
// });

const body = document.body;
const themeBtn = document.getElementById("themeBtn");
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(theme) {
  body.classList.remove("light", "dark");
  body.classList.add(theme);
}

function getSystemTheme() {
  return mediaQuery.matches ? "dark" : "light";
}

// Initial theme setup
const storedTheme = localStorage.getItem("theme");
applyTheme(storedTheme || getSystemTheme());

// Button toggle
themeBtn.addEventListener("click", () => {
  const newTheme = body.classList.contains("dark") ? "light" : "dark";
  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);
});

// System theme change listener
mediaQuery.addEventListener("change", () => {
  if (!localStorage.getItem("theme")) {
    applyTheme(getSystemTheme());
  }
});
