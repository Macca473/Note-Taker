

const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let notedatbs = require("./db/db.json");
console.log(notedatbs)

// function addids(arrobj) {
//   for (var id = 0; id < arrobj.length; id++) {
//     arrobj.id = arrobj[id];
//   }
// };

function addindexupdatejson() {
  notedatbs.forEach((obj, inx) => {
    obj.id = inx;
  });
  let notesstring = JSON.stringify(notedatbs);
  fs.writeFile("./db/db.json", notesstring, (err) => {
    if (err) console.log(err);
    console.log(`The ${notedatbs} was appended to file!`);
  });
}

app.use(express.static('public'));


app.get("/", function(req, res) {
  return res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
  return res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// app.get("*", function(req, res) {
//   return res.sendFile(path.join(__dirname, "/public/index"));
  
// });

app.get("/api/notes", function(req, res) {
  return res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.post("/api/notes", function(req, res) {
  console.log(notedatbs);
  res.send();
  notedatbs.push(req.body);
  addindexupdatejson();
});

// let id = notedatbs.id;

  app.delete(`/api/notes/:id`, function(req, res) {
    let id = req.params.id;
    let noteobj = JSON.stringify(notedatbs[id]);
    console.log(`${id} ${noteobj}`);
    notedatbs.splice(id, 1);
    res.send();
    // req.body = notedatbs[id];
    // console.log(res);
    // console.log(notetdel);
    // Object.assign(req.body, notetdel);
    addindexupdatejson();
});


app.listen(PORT, () => console.log(`app listening at http://localhost:${PORT}`));
