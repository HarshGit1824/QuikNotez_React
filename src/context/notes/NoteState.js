import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "673dff463a450c2a39587017",
      "user": "673d7d11d9f5e07feee46d68",
      "title": "My Title",
      "description": "Please wake up early",
      "tag": "personal",
      "date": "2024-11-20T15:24:54.562Z",
      "__v": 0
    },
      {
        "_id": "673dff463a1450c2a39587017",
        "user": "673d7d11d9f5e07feee46d68",
        "title": "My Title",
        "description": "Please wake up early",
        "tag": "personal",
        "date": "2024-11-20T15:24:54.562Z",
        "__v": 0
      },
      {
        "_id": "673dff473a450c12a39587019",
        "user": "673d7d11d9f5e07feee46d68",
        "title": "My Title",
        "description": "Please wake up early",
        "tag": "personal",
        "date": "2024-11-20T15:24:55.461Z",
        "__v": 0
      },
      {
        "_id": "673dff4613a450c2a39587017",
        "user": "673d7d11d9f5e07feee46d68",
        "title": "My Title",
        "description": "Please wake up early",
        "tag": "personal",
        "date": "2024-11-20T15:24:54.562Z",
        "__v": 0
      },
      {
        "_id": "673dff463a450c2a395817017",
        "user": "673d7d11d9f5e07feee46d68",
        "title": "My Title",
        "description": "Please wake up early",
        "tag": "personal",
        "date": "2024-11-20T15:24:54.562Z",
        "__v": 0
      },
      {
        "_id": "673d1ff473a450c2a39587019",
        "user": "673d7d11d9f5e07feee46d68",
        "title": "My Title",
        "description": "Please wake up early",
        "tag": "personal",
        "date": "2024-11-20T15:24:55.461Z",
        "__v": 0
      },
      {
        "_id": "673dff463a4510c2a39587017",
        "user": "673d7d11d9f5e07feee46d68",
        "title": "My Title",
        "description": "Please wake up early",
        "tag": "personal",
        "date": "2024-11-20T15:24:54.562Z",
        "__v": 0
      },
      {
        "_id": "673df1f463a450c2a39587017",
        "user": "673d7d11d9f5e07feee46d68",
        "title": "My Title",
        "description": "Please wake up early",
        "tag": "personal",
        "date": "2024-11-20T15:24:54.562Z",
        "__v": 0
      },
    ]

    const [notes, setNotes] = useState(notesInitial);
  return (
    <>
      <NoteContext.Provider value={{notes, setNotes}}>
        {props.children}
      </NoteContext.Provider>
    </>
  );
};

export default NoteState;
