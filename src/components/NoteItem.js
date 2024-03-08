import React, {useContext} from 'react'
import Notecontext from '../context/notes/notecontext'
const NoteItem = (props) => {
    const { note } = props;

    const context = useContext(Notecontext);
    const {deletenote} = context
    return (
        <div className='col-md-3 my-3'>
            <div className="card">
                <div className="card-body">
                    
                    <h5 className="card-title"> {note.title}</h5>
                    <p className="card-text">  {note.description}</p>
                    <div className="d-flex justify-content-center">
                            
                        <i className="fa-solid fa-trash mx-2" onClick={() => {
                            deletenote(note._id);
                        }}></i>
                        <i className="fa-solid fa-pen-to-square mx-2 "></i>
                    </div>

                </div>
            </div>

        </div>
    )
}


export default NoteItem