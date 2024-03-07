import React, {useContext} from 'react'
import Notecontext from '../context/notes/notecontext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
const Notes = () => {

    const context = useContext(Notecontext);
  const { notes } = context;
    return (
        <div>
            <AddNote/>
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
