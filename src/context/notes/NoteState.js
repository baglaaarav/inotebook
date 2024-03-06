
import NoteContext from "./notecontext";

const NoteState = (props) => {
    

    return (
        <NoteContext.Provider value={{  }}>
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;
