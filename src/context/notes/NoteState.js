import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // MARK: Get all Notes
  const getNotes = async () => {
    // API Call
    const responce = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjczZDdkMTFkOWY1ZTA3ZmVlZTQ2ZDY4In0sImlhdCI6MTczMjExMTIwM30.PjqMu34sNQJwoLl4G3AzzlCZTcQ0aHhMdSqf0WV62tU",
      },
    });
    const json = await responce.json();
    console.log(json);
    setNotes(json);
  };

  // MARK: ADD a Note
  const addNote = async (title, description, tag) => {
    // TODO: API call
    // API Call
    const responce = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjczZDdkMTFkOWY1ZTA3ZmVlZTQ2ZDY4In0sImlhdCI6MTczMjExMTIwM30.PjqMu34sNQJwoLl4G3AzzlCZTcQ0aHhMdSqf0WV62tU",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await responce.json();
    console.log(json);

    console.log("Adding a new note");
    const note = {
      _id: "673df1f463a450c2a39587017",
      user: "673d7d11d9f5e07feee46d684",
      title: title,
      description: description,
      tag: tag,
      date: "2024-11-20T15:24:54.562Z",
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // MARK: DELETE a Note
  const deleteNote = async (id) => {
    // TODO: API call
    const responce = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjczZDdkMTFkOWY1ZTA3ZmVlZTQ2ZDY4In0sImlhdCI6MTczMjExMTIwM30.PjqMu34sNQJwoLl4G3AzzlCZTcQ0aHhMdSqf0WV62tU",
      },
    });
    const json = responce.json();
    console.log(json);

    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  // MARK: UPDATE a Note
  const updateNote = async (id, title, description, tag) => {
    // API Call
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjczZDdkMTFkOWY1ZTA3ZmVlZTQ2ZDY4In0sImlhdCI6MTczMjExMTIwM30.PjqMu34sNQJwoLl4G3AzzlCZTcQ0aHhMdSqf0WV62tU",
        },
        body: JSON.stringify({ title, description, tag }),
      });

      const json = await response.json();

      if (response.ok) {
        // Update the note in the state
        const updatedNotes = notes.map((note) =>
          note._id === id ? json.note : note
        );
        setNotes(updatedNotes);
        console.log("Note updated successfully on both frontend and backend.");
      } else {
        console.error("Failed to update note on the backend:", json);
      }
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };

  return (
    <>
      <NoteContext.Provider
        value={{ notes, addNote, deleteNote, updateNote, getNotes }}
      >
        {props.children}
      </NoteContext.Provider>
    </>
  );
};

export default NoteState;
