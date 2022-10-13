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

        app.get('/notes', (req, res) => {
            res.sendFile(path.join(__dirname, "../public/notes.html"))
        });

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, "../public/index.html"))
        });

        function updateDB()  {
            fs.writeFile("db/db.json", JSON.stringify(notes, "\t"),err => {
                if (err) throw err;
                return true;
            });
        }

        
    });
}