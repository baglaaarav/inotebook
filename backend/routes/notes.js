const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes')
const fetchuser = require('../middleware/fetchUser');
const { body, validationResult } = require('express-validator');


//this will fetch all the note and return them 
//Route 1 : Get all the notes using GET "/api/notes/fetchallnotes"/ login required 
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.status(200).json(notes)
    } catch (error) {
        console.log(error.message)
        res.status(500).send("some error occured")
    }
})

//Route 2 : add a new Note using post "/api/notes/addnote"/ login required 
router.post('/addnote', fetchuser, [
    body('title', 'Enter a tittle').isLength({ min: 1 }),
    body('description', 'Enter a description').isLength({ min: 1 })

], async (req, res) => {



    //If there are errors, return Bad request and the errors
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }


    try {

        const { title, description, tag } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Notes({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()

            res.json(savedNote)

    } catch (error) {
        console.log(error.message)
        res.status(500).send("some error occured")
    }
})


//Route 3 : Update a existing  Note using post "/api/notes/updatenote"/ login required 


router.put('/updatenote/:id', fetchuser,async (req, res) => {

    try {

        //what is updated here 
        const { title, description, tag } = req.body;
        var newNote = {};
        if(title){newNote.title = title}
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};
        

        //check the same person is updating the notes
        let note = await Notes.findById(req.params.id)
        if(!note) {return  res.send(404).send("Not found");}

        if(note.user.toString() !== req.user.id){
            return res.staus(401).send("Not Allowed")
        }

       //find the note to be updated and update it 
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.json({note});



    } catch (error) {
        console.log(error.message)
        res.status(500).send("some error occured")
    }
})



module.exports = router