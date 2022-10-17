const fs = require('fs');
const path = require('path');
const router = require('express').Router()
const uniqid = require('uniqid');



    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw (err)
        var notes = JSON.parse(data);

        router.get("/api/notes", (req, res) => {
            res.json(notes);
        });

        router.post("/api/notes", (req, res) =>{
            
            const newNote = {
                title: req.body.title,
                text: req.body.text,
                id: uniqid()
            };
            notes.push(newNote);
            updateDB();
            res.json(newNote)

        });

        router.get('/notes', (req, res) => {
            res.sendFile(path.join(__dirname, "../public/notes.html"))
        });

        router.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, "../public/index.html"))
        });

        function updateDB()  {
            fs.writeFile("db/db.json", JSON.stringify(notes, "\t"),err => {
                if (err) throw err;
                return true;
            });
        }

        
    });

module.exports = router