const fs = require('fs');
const path = require('path');
const router = require('express').Router()
const uniqid = require('uniqid');



    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw (err)
        var notes = JSON.parse(data);
//set up for the /api/notes get route
        router.get("/api/notes", (req, res) => {
            // reason the db.json file and display all saved notes
            res.json(notes);
        });
// set up for the /api/notes post route
        router.post("/api/notes", (req, res) => {
            // making the new note object with the uniqid receives the new note adds it the json file and returns the note
            const newNote = {
                title: req.body.title,
                text: req.body.text,
                id: uniqid()
            };
            notes.push(newNote);
            updateDB();
            res.json(newNote)

        });
// set up the api to get a specifice note based on id number
        router.get('/api/notes/:id', (req, res) => {
            res.json(notes[req.params.id])
        });
//deletes the note with the specfic id selected
        router.delete('/api/notes/:id', (req, res) => {
            notes.splice(req.params.id, 1);
            updateDB();
            res.json(notes)
            console.log('note deleted' +req.params.id);
        })
// route to show the notes.html page
        router.get('/notes', (req, res) => {
            res.sendFile(path.join(__dirname, "../public/notes.html"))
        });
//route to show the index.html for all other route access
        router.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, "../public/index.html"))
        });
// updates the json file whenever a note is added or deleted
        function updateDB()  {
            fs.writeFile("db/db.json", JSON.stringify(notes, "\t"),err => {
                if (err) throw err;
                return true;
            });
        }

        
    });

module.exports = router