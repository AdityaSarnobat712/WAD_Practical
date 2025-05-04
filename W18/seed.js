const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Aditya:aditya123@cluster0.6e9xkxv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const songSchema = new mongoose.Schema({
  songname: String,
  film: String,
  music_director: String,
  singer: String,
  actor: String,
  actress: String,
});

const Song = mongoose.model('Song', songSchema);

const songs = [
  {
    songname: "Tum Hi Ho",
    film: "Aashiqui 2",
    music_director: "Mithoon",
    singer: "Arijit Singh",
    actor: "Aditya Roy Kapoor",
    actress: "Shraddha Kapoor"
  },
  {
    songname: "Kal Ho Naa Ho",
    film: "Kal Ho Naa Ho",
    music_director: "Shankar-Ehsaan-Loy",
    singer: "Sonu Nigam",
    actor: "Shah Rukh Khan",
    actress: "Preity Zinta"
  },
  {
    songname: "Tujhe Dekha",
    film: "DDLJ",
    music_director: "Jatin-Lalit",
    singer: "Lata Mangeshkar",
    actor: "Shah Rukh Khan",
    actress: "Kajol"
  },
  {
    songname: "Channa Mereya",
    film: "Ae Dil Hai Mushkil",
    music_director: "Pritam",
    singer: "Arijit Singh",
    actor: "Ranbir Kapoor",
    actress: "Anushka Sharma"
  },
  {
    songname: "Zaalima",
    film: "Raees",
    music_director: "JAM8",
    singer: "Arijit Singh",
    actor: "Shah Rukh Khan",
    actress: "Mahira Khan"
  }
];

Song.insertMany(songs)
  .then(() => {
    console.log("5 songs inserted!");
    mongoose.connection.close();
  })
  .catch(err => {
    console.error("Error inserting songs:", err);
  });
