const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

let notesArray = [];

//Routes
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/styles", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/css/styles.css"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});


app.get("/api/notes", function(req, res) {
    res.json(notesArray);
});

app.post("/api/journals", function (req, res) {
    notesArray.push(req.body);
    res.json("saved");
});

app.delete("/api/notes/:index", function (req, res) {
    const elem = parseInt(req.params.index);
    let tempNote = [];
    for (let i = 0; i < notesArray.length; i++) {
        if (i !== elem) {
            tempNote.push(notesArray[i]);
        }
    }
    notesArray = tempNote;

    res.json("delete done");
});

//Listener
app.listen(PORT, function() {
    console.log("App listening on PORT:" + PORT);
});