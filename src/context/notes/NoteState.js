
import { useState } from "react";
import NoteContext from "./notecontext";

const NoteState = (props) => {

    const notesf = [
        {
          "_id": "65e364f5d5135556d03138fa",
          "user": "65e363f3784e87d0f459e49a",
          "title": "good morning",
          "description": "Please wake up early",
          "tag": "good",
          "date": "2024-03-02T17:42:13.228Z",
          "__v": 0
        },
        {
          "_id": "65e8539d64e78a55b36f19b4",
          "user": "65e363f3784e87d0f459e49a",
          "title": "good morning",
          "description": "godd morning",
          "tag": "why",
          "date": "2024-03-06T11:29:33.455Z",
          "__v": 0
        },
        {
          "_id": "65e8539f64e78a55b36f19b6",
          "user": "65e363f3784e87d0f459e49a",
          "title": "good morning",
          "description": "godd morning",
          "tag": "why",
          "date": "2024-03-06T11:29:35.717Z",
          "__v": 0
        },
        {
          "_id": "65e853a164e78a55b36f19b8",
          "user": "65e363f3784e87d0f459e49a",
          "title": "good morning",
          "description": "godd morning",
          "tag": "why",
          "date": "2024-03-06T11:29:37.512Z",
          "__v": 0
        },
        {
          "_id": "65e853a264e78a55b36f19ba",
          "user": "65e363f3784e87d0f459e49a",
          "title": "good morning",
          "description": "godd morning",
          "tag": "why",
          "date": "2024-03-06T11:29:38.074Z",
          "__v": 0
        },
        {
          "_id": "65e853a464e78a55b36f19bc",
          "user": "65e363f3784e87d0f459e49a",
          "title": "good morning",
          "description": "godd morning",
          "tag": "why",
          "date": "2024-03-06T11:29:40.384Z",
          "__v": 0
        }
      ];
      const [notes, changeNotes] = useState(notesf);


    return (
        <NoteContext.Provider value={{ notes, changeNotes }}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;
