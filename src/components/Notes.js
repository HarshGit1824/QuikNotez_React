import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Notes = (props) => {
  const context = useContext(noteContext);
  let navigate = useNavigate();
  const { notes, getNotes, updateNote } = context; // Use updateNote instead of editNote

  const ref = useRef(null); // For modal trigger
  const refClose = useRef(null); // For closing modal after update
  const [note, setNote] = useState({
    id: "",
    title: "",
    description: "",
    tag: "",
  });

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     getNotes();
  //   } else {
  //     navigate("/login");
  //   }
  //   getNotes();
  //   // eslint-disable-next-line
  // }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getNotes();
    }
    // eslint-disable-next-line
  }, []);
  

  const openUpdateModal = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      title: currentNote.title,
      description: currentNote.description,
      tag: currentNote.tag,
    });
    props.showAlert("Updated Successfully", "success");
  };

  const handleClick = (e) => {
    e.preventDefault();
    updateNote(note.id, note.title, note.description, note.tag); // Calls updated function
    refClose.current.click(); // Closes the modal after updating
    props.showAlert("Updated Successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      {/* Hidden button to trigger modal */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={note.title}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    rows="3"
                    value={note.description}
                    onChange={onChange}
                    minLength={5}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    name="tag"
                    value={note.tag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                disabled={note.title.length < 5 || note.description.length < 5}
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notes List */}
      {/* <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
          {notes.length === 0 && "No Notes to Display"}
        </div>
        {notes.map((note) => (
          <Noteitem
            key={note._id}
            updateNote={openUpdateModal}
            showAlert={props.showAlert}
            note={note}
          />
        ))}
      </div> */}

      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-2">
          {(!Array.isArray(notes) || notes.length === 0) &&
            "No Notes to Display"}
        </div>
        {Array.isArray(notes) &&
          notes.map((note) => (
            <Noteitem
              key={note._id}
              updateNote={openUpdateModal}
              showAlert={props.showAlert}
              note={note}
            />
          ))}
      </div>
    </>
  );
};

export default Notes;
