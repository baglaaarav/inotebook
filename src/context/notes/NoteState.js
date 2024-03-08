
import { useState } from "react";
import NoteContext from "./notecontext";

const NoteState = (props) => {
  const host = "http://localhost:4000"
  const notesf = [];
  const [notes, changeNotes] = useState(notesf);
  //get a note

  const getnotes = async() => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMzYzZjM3ODRlODdkMGY0NTllNDlhIn0sImlhdCI6MTcwOTQwMTA3NX0.-TPsv1k0-4-bUjSKmVuZV3e9tN24AkrESkEAULdHUIs"
      }
    });
    const json= await response.json();
    
    changeNotes(json)
  }



  //add a note
  const addnote = async(title, description, tag) => {
    // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/addnote`, {
      
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMzYzZjM3ODRlODdkMGY0NTllNDlhIn0sImlhdCI6MTcwOTQwMTA3NX0.-TPsv1k0-4-bUjSKmVuZV3e9tN24AkrESkEAULdHUIs"
      },
      body: JSON.stringify({title,description, tag })
    });

// eslint-disable-next-line

    getnotes()
  }

  //delete a note
  const deletenote =async (id) => {
    //apu
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMzYzZjM3ODRlODdkMGY0NTllNDlhIn0sImlhdCI6MTcwOTQwMTA3NX0.-TPsv1k0-4-bUjSKmVuZV3e9tN24AkrESkEAULdHUIs"
      }
    });
    // eslint-disable-next-line
    const json = response.json();
    // eslint-disable-next-line

    const newNote = notes.filter((note) => { return note._id !== id })
    changeNotes(newNote);
  }

  //edit a note
  const editnote = async (id, title, description, tag) => {
    //API call

    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjVlMzYzZjM3ODRlODdkMGY0NTllNDlhIn0sImlhdCI6MTcwOTQwMTA3NX0.-TPsv1k0-4-bUjSKmVuZV3e9tN24AkrESkEAULdHUIs"
      },
      body: JSON.stringify({ title,description, tag })
    });
    // eslint-disable-next-line
    const json = response.json();
    // eslint-disable-next-line


    //Logic to edit in client

    let newnote= JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newnote.length; index++) {
      const element = newnote[index];
      if (element._id === id) {
        newnote[index].title = title;
        newnote[index].description = description;
        newnote[index].tag = tag;
        break;
      }
    }
    changeNotes(newnote)
  }




  return (
    <NoteContext.Provider value={{ notes, addnote, deletenote, editnote, getnotes}}>
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;
