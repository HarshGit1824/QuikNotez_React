import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  // MARK: Get all Notes
  // const getNotes = async () => {
  //   // API Call
  //   const responce = await fetch(`${host}/api/notes/fetchallnotes`, {
  //     method: "GET",
  //     headers: {
  //       "Content-type": "application/json",
  //       "auth-token":
  //         localStorage.getItem('token')
  //     },
  //   });
  //   const json = await responce.json();
  //   console.log(json);
  //   setNotes(json);
  // };

  const getNotes = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found. User might not be logged in.");
      return;
    }

    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });

      if (!response.ok) {
        console.error("Failed to fetch notes:", response.statusText);
        return;
      }

      const json = await response.json();
      console.log(json)
      setNotes(json); // Assuming the API returns an array
    } catch (error) {
      console.error("Error while fetching notes:", error);
    }
  };

  // MARK: ADD a Note
  const addNote = async (title, description, tag) => {
    // TODO: API call
    // API Call
    const responce = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "auth-token": localStorage.getItem("token"),
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
        "auth-token": localStorage.getItem("token"),
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
          "auth-token": localStorage.getItem("token"),
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
