import React, {useState,  useContext, useEffect, useRef } from 'react'
import Notecontext from '../context/notes/notecontext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
const Notes = () => {

    const context = useContext(Notecontext);
    const { notes, getnotes, editnote } = context;

    const ref = useRef(null)
    const refC = useRef(null)
    useEffect(() => {

        getnotes();
        // eslint-disable-next-line
    }, [])
    const [note, setNote] = useState({id: " ", title : "", description :  "", tag : "default"});

    const updateNote = (note) => {
        ref.current.click();
        setNote({id: note._id, title:note.title, description: note.description , tag : note.tag})
        
    }
    
    
    // eslint-disable-next-line
    const handleClick = (e) => {
        
        editnote(note.id, note.title, note.description, note.tag)
        refC.current.click();
        
    }
    const onchange=(e)=>{
        setNote({...note, [e.target.name] : e.target.value })
    }
    return (
        <div>
            <AddNote />


            <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" ref={ref}>
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">tag</label>
                                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onchange} />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refC} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="row my-3">

                <h1>Your Notes</h1>

                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>


        </div>
    )
}

export default Notes
