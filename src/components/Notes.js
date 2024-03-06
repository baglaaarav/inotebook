import React, {useContext} from 'react'
import Notecontext from '../context/notes/notecontext'
import NoteItem from './NoteItem';
const Notes = () => {

    const context = useContext(Notecontext);
  const { notes, changeNotes } = context;
    return (
        <div>
            <div className="row my-3">

                <h1>Your Notes</h1>

                {notes.map((note) => {
                    return <NoteItem key={note._id} note= {note} />
                })}
            </div>


        </div>
    )
}

export default Notes
