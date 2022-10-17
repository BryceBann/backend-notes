const fs = require('fs');
const path = require('path');
const router = require('express').Router()



    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw (err)
        var notes = JSON.parse(data);

        router.get("/api/notes", (req, res) => {
         console.log(notes)
            res.json(notes);
        });

        router.post("/api/notes", (req, res) =>{

            let newNote = req.body;
            notes.push(newNote);
            updateDB();
            return console.log('Added new note: ' +newNote.title)
        });

        router.get('/notes', (req, res) => {
            res.sendFile(path.join(__dirname, "../public/notes.html"))
        });

        router.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, "../public/index.html"))
        });

        // function updateDB()  {
        //     fs.writeFile("db/db.json", JSON.stringify(notes, "\t"),err => {
        //         if (err) throw err;
        //         return true;
        //     });
        // }

        
    });

module.exports = router