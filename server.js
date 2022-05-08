const express = require("express");
const ejs = require("ejs");
const socket = require("socket.io");
const url = require("./setup/url").url;
const Student = require("./Schema/personRegister");
const Question = require("./Schema/projRegister");
const Transaction = require("./Schema/transaction");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const host = "0.0.0.0";
let app = express();

//MIDDLEWARE CONFIGURATION
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

//DATABASE CONNECTION
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(() => console.log("Database connected successfully !"))
    .catch(err => console.log(err));


//ROUTES

app.get("/trans", (req, res) => {
    res.sendFile('./public/trans.html', { root: __dirname });
})
app.post("/details", (req, res) => {
    console.log(req.body);
    const { name, email, branch, number, city, clgaddr, projname, projguide, guidenumber, projdescription, projrequire } = req.body;
    if (name && email.includes("@") && number.length === 10 && guidenumber.length === 10) {
        Student.findOne({ email: req.body.email })
            .then((person) => {
                if (person) {
                    // res.json({emailerr:"User registered already !"});

                    res.send(`<h2>You are registered already ! Maybe ${person.name} this is you !&#128580;</h2>`)
                } else {
                    const otherPerson = new Student({
                        name: req.body.name,
                        email: req.body.email,
                        branch: req.body.branch,
                        number: req.body.number,
                        city: req.body.city,
                        clgaddr: req.body.clgaddr,
                        projname: req.body.projname,
                        projguide: req.body.projguide,
                        guidenumber: req.body.guidenumber,
                        projdescription: req.body.projdescription,
                        projrequire: req.body.projrequire
                    })

                    otherPerson.save()
                        .then((person) => {
                            console.log(`Database updated successfully`);
                            res.render('questionairedetail', {
                                emailval: req.body.email
                            });
                        })
                        .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
    } else {
        res.sendFile('./public/error404.html', { root: __dirname });
    }
})

app.post("/iitdet", (req, res) => {
    console.log(req.body);
    const { email, reply1, reply2, reply3 } = req.body;
    if (email && reply1 && reply2 && reply3) {
        Question.findOne({ email: req.body.email })
            .then((person) => {
                if (person) {
                    res.json({ emailerr: "User registered already !" });
                } else {
                    const otherPerson = new Question({
                        email: req.body.email,
                        reply1: req.body.reply1,
                        reply2: req.body.reply2,
                        list: req.body.list,
                        reply3: req.body.reply3
                    })

                    otherPerson.save()
                        .then((person) => {
                            console.log(`Database updated successfully`);
                            res.render("payment", {
                                email: req.body.email
                            });
                        })
                        .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
    } else {
        res.sendFile('./public/error404.html', { root: __dirname });
    }
})

app.post("/payment", (req, res) => {
    console.log(req.body);
    const { email, transaction } = req.body;
    if (transaction) {
        Transaction.findOne({ email: req.body.email })
            .then((person) => {
                if (person) {
                    res.json({ emailerr: "User registered already !" });
                } else {
                    const otherPerson = new Transaction({
                        email: req.body.email,
                        transaction: transaction
                    })

                    otherPerson.save()
                        .then((person) => {
                            console.log(`Database updated successfully`);
                            res.redirect("https://chat.whatsapp.com/Hv4d6jqWZqlGGREvS9GID3");
                            // res.sendFile('./public/success.html', { root: __dirname });
                        })
                        .catch(err => console.log(err));
                }
            })
            .catch(err => console.log(err));
    } else {
        res.sendFile('./public/transactionissue.html', { root: __dirname });
    }
})
app.get("/gallery", (req, res) => {

    res.sendFile('./public/videos.html', { root: __dirname });
})

app.get("/payment", (req, res) => {
    res.sendFile('./public/pay.html', { root: __dirname });
})

app.get("/database", (req, res) => {
    res.sendFile('./public/database.html', { root: __dirname });
})

app.get("/:email", (req, res) => {
    console.log(req.params.email);
    var email = req.params.email;
    Question.findOne({ email: req.params.email })
        .then((student) => {
            if (student) {
                res.render("questiiondetails", {
                    email: student.email,
                    answer1: student.reply1,
                    answer2: student.reply3,
                    answer3: student.reply2,
                    workshop: student.list
                })
            }
        })
        .catch(err => console.log(err));
})

app.post("/checktransaction", (req, res) => {
    console.log(req.body);
    var flag;
    Transaction.findOne({ email: req.body.email })
        .then((transaction) => {
            console.log(transaction);
            if (transaction) {
                console.log("entered")
                flag = "FOUND";
                res.render("transactioncheck", {
                    response: flag
                })
            } else {
                flag = "NOTFOUND";
                res.render("transactioncheck", {
                    response: flag
                })
            }


        })
        .catch(err => console.log(err));
})
var server = app.listen(port, host, () => console.log(`Server is running at ${port}`));


var io = socket(server);

io.on("connection", (socket) => {
    console.log("Connection Established !", socket.id);






    // io.sockets.emit("chats", "man");

    //Handle events

    Student.find()
        .then((data) => {
            io.emit("students", data);

        })
        .catch(err => console.log(err));


})

