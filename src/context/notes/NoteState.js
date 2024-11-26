import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const s1 = {
    name: "Harsh",
    class: "10th",
  };
  const [state, setState] = useState(s1);
  const update = () => {
    setTimeout(() => {
        setState ({
          name: "Harshal Thaware",
          class: "17th",
        })
    }, 1000);
  }
  return (
    <>
      <NoteContext.Provider value={{state:state, update:update}}>
        {props.children}
      </NoteContext.Provider>
    </>
  );
};

export default NoteState;
