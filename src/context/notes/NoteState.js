import React, { useState } from "react";
import NoteContext from "./notecontext";

const NoteState = (props) => {
    const s1 = {
        "name": "Aarav",
        "age": "20"
    }
    

    const [state, setState] = useState(s1);

    const update = () => {
        setTimeout(() => {
            setState({
                "name": "bagla",
                "age": "21"
            });
        }, 1000);
    }

    return (
        <NoteContext.Provider value={{ state, update }}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;
