




let searchInput = document.getElementById("searchInput");
let cardContainer = document.getElementById("cardContainer");

const users = [
  {
    name: "Aman Sharma",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    intro: "Frontend Developer | React & JS"
  },
  {
    name: "Rohit Verma",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
    intro: "Backend Developer | Node.js"
  },
  {
    name: "Priya Singh",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    intro: "UI/UX Designer"
  },
  {
    name: "Neha Patel",
    photo: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9",
    intro: "Full Stack Developer"
  },
  {
    name: "Arjun Mehta",
    photo: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
    intro: "Software Engineer | JavaScript"
  },
  {
    name: "Priyanka Kapoor",
    photo: "https://plus.unsplash.com/premium_photo-1731355868248-334b5698fe48?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTQ2fHxpbmRpYW4lMjBnaXJsJTIwd2l0aCUyMGxhcHRvcHxlbnwwfHwwfHx8MA%3D%3D",
    intro: "Frontend Developer | React & JS"
  },
  {
    name: "Rajesh Kumar",
    photo: "https://images.unsplash.com/photo-1729157659487-00269da1b528?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGluZGlhbiUyMGJveXxlbnwwfHwwfHx8MA%3D%3D",
    intro: "Backend Developer | Node.js"
  },
  {
    name: "Sneha Patel",
    photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    intro: "UI/UX Designer"
  },
  {
    name: "Vikram Singh",
    photo: "https://plus.unsplash.com/premium_photo-1682089869602-2ec199cc501a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGluZGlhbiUyMGJveXxlbnwwfHwwfHx8MA%3D%3D",
    intro: "Full Stack Developer"
  }
];

function renderUser(user){
    cardContainer.innerHTML = "";

    if(user.length === 0){
        cardContainer.innerHTML = `<p class="empty">No User Found 😕</p>`;
        return;
    }

    user.forEach(users =>{
        const card = `
        <div class="card fade-in">
            <img src="${users.photo}" alt="${users.name}" />
            <div class="card-body">
                <h2 class="card-title">${users.name}</h2>
                <p class="card-subtitle">${users.intro}</p>
            </div>
        </div>`;
        cardContainer.innerHTML += card;
    });
    
};

renderUser(users);

function debounce(fn, delay) {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}



const debouncedSearch = debounce(()=>{
    let filteredUsers = users.filter(user => user.name.startsWith(searchInput.value));
    renderUser(filteredUsers);
}, 300);

searchInput.addEventListener("input", debouncedSearch);
