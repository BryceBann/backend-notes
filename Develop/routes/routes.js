const fs = require('fs');
const path = require('path');

module.exports = app => {

    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw (err)
        var notes = JSON.parse(data);

        app.get("/api/notes", (req, res) => {

            res.json(notes);
        });

        app.post("/api/notes", (req, res) =>{

            let newNote = req.body;
            notes.push(newNote);
            updateDB();
            return console.log('Added new note: ' +newNote.title)
        });

        
    })
}