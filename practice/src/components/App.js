import React, { useState, useEffect } from "react";
import axios from "axios";
import Note from "./Note";

const App = props => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/notes").then(response => {
      console.log("promise fulfilled");
      setNotes(response.data);
    });
  }, []);
  console.log("render", notes.length, "notes");

  const notesToShow = showAll ? notes : notes.filter(note => note.important);
  const rows = () =>
    notesToShow.map(note => <Note key={note.id} note={note} />);

  const addNote = event => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1
    };

    setNotes(notes.concat(noteObject));
    setNewNote("");
  };

  const handleNoteChange = event => {
    setNewNote(event.target.value);
  };

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? "Important" : "All"}
        </button>
      </div>
      <ul>{rows()}</ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="Submit">Save</button>
      </form>
    </div>
  );
};

export default App;