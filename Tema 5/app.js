document.addEventListener("DOMContentLoaded", function () {
    const notesList = document.getElementById("notes");
    const noteText = document.getElementById("note-text");
    const saveBtn = document.getElementById("save-btn");
    const deleteBtn = document.getElementById("delete-btn");
  
    let currentNoteId = null;
  
    // Dummy data
    const notes = [
      { id: 1, text: "Note 1" },
      { id: 2, text: "Note 2" },
    ];
  
    function renderNotes() {
      notesList.innerHTML = "";
      notes.forEach(note => {
        const li = document.createElement("li");
        li.textContent = note.text;
        li.addEventListener("click", () => loadNoteForEdit(note));
        notesList.appendChild(li);
      });
    }
  
    function loadNoteForEdit(note) {
      currentNoteId = note.id;
      noteText.value = note.text;
    }
  
    function saveNote() {
      const text = noteText.value.trim();
      if (text === "") {
        alert("Please enter some text.");
        return;
      }
  
      if (currentNoteId) {
        // Update existing note
        const existingNote = notes.find(note => note.id === currentNoteId);
        existingNote.text = text;
      } else {
        // Create new note
        const newNote = { id: Date.now(), text: text };
        notes.push(newNote);
      }
  
      renderNotes();
      clearNoteEditor();
    }
  
    function deleteNote() {
      if (currentNoteId) {
        const index = notes.findIndex(note => note.id === currentNoteId);
        notes.splice(index, 1);
        renderNotes();
        clearNoteEditor();
      }
    }
  
    function clearNoteEditor() {
      currentNoteId = null;
      noteText.value = "";
    }
  
    saveBtn.addEventListener("click", saveNote);
    deleteBtn.addEventListener("click", deleteNote);
  
    // Initial render
    renderNotes();
  });
  