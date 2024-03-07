import React, {useContext, useState} from 'react'
import Notecontext from '../context/notes/notecontext'
const AddNote = () => {
    const context = useContext(Notecontext);
    const { addnote } = context;
    const [note, setNote] = useState({title : "", description :  "", tag : ""});
    const handleClick = (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag);
    }
    const onchange=(e)=>{
        setNote({...note, [e.target.name] : e.target.value })
    }
    return (
        <div>
            <div className='container my-3'>
                <h1>Add a Note</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onchange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" id="description" name='description'  onChange={onchange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">tag</label>
                        <input type="text" className="form-control" id="tag" name='tag'  onChange={onchange}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>

            </div>
        </div>
    ) 
}

export default AddNote
