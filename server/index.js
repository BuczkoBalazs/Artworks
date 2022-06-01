const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const ArtworkModel = require('./models/Artwork');
const fs = require('fs')


// MONGODB DATABASE CONNECTION

mongoose.connect('mongodb+srv://testuser:testuser12345@artworks.5abde.mongodb.net/artworkdatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
})

// APP USE
app.use(express.json());
app.use(cors());


// APP GET
app.get('/read', async (req, res) =>{

    ArtworkModel.find({},(err, result) =>{
        if (err){
            res.send(err)
        }
        res.send(result)
    })
})

const usersPath = `${__dirname}/users.json`;

app.use('/login', (req, res) => {
  const users = fs.readFileSync(usersPath, err => {
    if (err) console.log(err);
  })

  const usersJson = JSON.parse(users);
  let didAnswer = false;

  Array.from(usersJson).map((user, index) => {
    if (req.body.email === user.email && req.body.password === user.password) {
      didAnswer = true;
      return res.status(200).send({ token: `${req.body.email}ok` })
    }
    if (req.body.email === user.email && req.body.password !== user.password) {
      didAnswer = true;
      return res.status(401).send({ error: "Incorrect password" });
    }
    if (!didAnswer && index === Array.from(usersJson).length - 1) return res.status(401).send({ error: "No user registered under this email address" })
  });
});

app.post('/reg', (req, res) => {
  let usersJson = [];
  let users = fs.readFileSync(usersPath, err => {
    if (err) console.log(err);
  })

  usersJson = JSON.parse(users);

  let alreadyTaken = false;

  Array.from(usersJson).map(user => (user.email === req.body.email) ? alreadyTaken = true : null);

  if (alreadyTaken) res.status(500).send({ error: "This e-mail has already been registered" })
  else {
    const newUser = req.body;
    newUser.favorites = [];
    usersJson.push(newUser);

    fs.writeFileSync(usersPath, JSON.stringify(usersJson, null, 4), err => {
      if (err) {
        console.log(err)
        return res.status(500).send(err);
      }
    });
    res.status(200).send("Your e-mail has been registered successfully!");
  }
});

app.post('/addToFav', (req, res) => {
  let usersJson = [];
  let users = fs.readFileSync(usersPath, err => {
    if (err) console.log(err);
  })

  usersJson = JSON.parse(users);

  Array.from(usersJson).map(user => {
    if (user.email === req.body.email) {
      const index = user.favorites.indexOf(req.body.imageId);
      if (index === -1) user.favorites.push(req.body.imageId)
      else user.favorites.splice(index, 1);
    }
  });

  app.use('/getFavs', (req, res) => {
    let usersJson = [];
    let users = fs.readFileSync(usersPath, err => {
      if (err) console.log(err);
    })

    usersJson = JSON.parse(users);

    Array.from(usersJson).map(user => {
      if (user.email === req.body.email) return res.status(200).send(JSON.stringify(user.favorites))
    })
  })

  fs.writeFileSync(usersPath, JSON.stringify(usersJson, null, 4), err => {
    if (err) {
      console.log(err)
      return res.status(500).send(err);
    }
  });

  return res.status(200).send('added')

})





// APP LISTEN
app.listen(3001, () =>{
    console.log("Server is running... Run after it!")
});