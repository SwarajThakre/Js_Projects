let addBtn = document.getElementById("addBtn");
let closeForm = document.getElementById("closeForm");
let noteForm = document.getElementById("noteForm");
let noteCard = document.getElementById("noteCard");
let upBtn = document.getElementById("upBtn");
let downBtn = document.getElementById("downBtn");

let notes = JSON.parse(localStorage.getItem("notes")) || [];
let currentNote = 0;

function renderNotes(){
    if(notes.length === 0){
        noteCard.classList.add("hidden");
        return;
    }

    const note = notes[currentNote];
    noteCard.classList.remove("hidden");
    noteCard.innerHTML = `
        <img src="${note.img}" alt="${note.name}">
        <div class="card-content">
        <span class="${note.priority}">${note.priority}</span>
        <h3>${note.name}</h3>
        <p><b>Address:</b>${note.address}</p>
        <p>${note.purpose}</p>
        </div>
        <button id="callBtn" type="button" >Call</button>
        <button id="messageBtn" type="button">message</button>
    `

}

addBtn.addEventListener("click", function(){
    noteForm.classList.remove("hidden");
    noteCard.classList.add("hidden");
})

closeForm.addEventListener("click", function(){
    noteForm.classList.add("hidden");
    renderNotes();
})

noteForm.addEventListener("submit", function(e){
    e.preventDefault();

    const newNote = {
        id: Date.now(),
        img: document.getElementById("img").value.trim(),
        name: document.getElementById("name").value,
        address: document.getElementById("address").value,
        priority: document.getElementById("priority").value,
        purpose : document.getElementById("purpose").value,
    }

    notes.push(newNote);
    localStorage.setItem("notes", JSON.stringify(newNote));

    noteForm.reset();
    noteForm.classList.add("hidden");
    noteCard.classList.remove("hidden");

    currentNote = notes.length - 1;
    renderNotes();
})

upBtn.addEventListener("click", function(){
    if(currentNote > 0){
        currentNote--;
        renderNotes();
    }
})

downBtn.addEventListener("click", function(){
    if(currentNote < notes.length - 1){
        currentNote++;
        renderNotes();
    }
})



renderNotes();