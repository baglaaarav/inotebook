import React, { useContext } from 'react'
import Notecontext from '../context/notes/notecontext'
const NoteItem = (props) => {
    const { note, updateNote } = props;

    const context = useContext(Notecontext);
    const { deletenote } = context

    
    return (
        <div className='col-md-3 my-3'>
            <div className="card text-bg-secondary">
                <div className="card-body">

                    <h5 className="card-title"> {note.title}</h5>
                    <p className="card-text">  {note.description}</p>

                    <div className="row">
                        <div className="col">
                            <i className="fa-solid fa-trash mx-2" onClick={() => {
                                props.showAlert("Deleted successfully", "success")
                                deletenote(note._id);
                            }}></i>
                            <i className="fa-solid fa-pen-to-square mx-2 " onClick={() => {
                                
                                updateNote(note);
                            }}></i>
                        </div>
                        <div className="col">
                            <p className="card-text"> Tag:  {note.tag}</p>
                        </div>
                        
                    </div>


                </div>
            </div>

        </div>
    )
}

  
export default NoteItem