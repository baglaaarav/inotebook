import React, {useContext, useState} from 'react'
import Notecontext from '../context/notes/notecontext'

const AddNote = (props) => {
    const context = useContext(Notecontext);
    const { addnote } = context;
    const [note, setNote] = useState({title : "", description :  "", tag : "default"});
    const handleClick = (e) => {
        e.preventDefault();
        addnote(note.title, note.description, note.tag);
        setNote({title : "", description :  "", tag : ""});
        props.showAlert("Added Note Successfully", "success")
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
                        <input style={{color:"white", backgroundColor:"#888e99"}} type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={onchange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input style={{color:"white", backgroundColor:"#888e99"}} type="text" className="form-control" id="description" name='description' value={note.description}   onChange={onchange}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">tag</label>
                        <input style={{color:"white", backgroundColor:"#888e99"}} type="text" className="form-control" id="tag" name='tag'  onChange={onchange} value={note.tag}/>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
                </form>

            </div>
        </div>
    ) 
}

export default AddNote
