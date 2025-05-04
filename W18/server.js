const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Song = require('./models/song');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

mongoose.connect('mongodb+srv://Aditya:aditya123@cluster0.6e9xkxv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// (c) Insert sample songs (Run only once)
app.get('/insert', async (req, res) => {
  const songs = [
    { songname: "ABC", film: "DEF", music_director: "GHI", singer: "JKL" },
    { songname: "Song2", film: "Movie2", music_director: "GHI", singer: "Singer1" },
    { songname: "Song3", film: "Movie3", music_director: "Director2", singer: "Singer2" },
    { songname: "Song4", film: "Movie4", music_director: "Director3", singer: "Singer1" },
    { songname: "Song5", film: "Movie5", music_director: "GHI", singer: "JKL" }
  ];
  await Song.insertMany(songs);
  res.send('Songs inserted');
});

// (d) Show all songs & count
app.get('/', async (req, res) => {
  const songs = await Song.find();
  const count = await Song.countDocuments();
  res.render('index', { songs, count });
});

// (e) Songs by music director
app.get('/director/:name', async (req, res) => {
  const songs = await Song.find({ music_director: req.params.name });
  res.render('index', { songs, count: songs.length });
});

// (f) Songs by music director and singer
app.get('/director/:director/singer/:singer', async (req, res) => {
  const songs = await Song.find({
    music_director: req.params.director,
    singer: req.params.singer
  });
  res.render('index', { songs, count: songs.length });
});

// (g) Delete by name
app.get('/delete/:name', async (req, res) => {
  await Song.deleteOne({ songname: req.params.name });
  res.redirect('/');
});

// (h) Add favorite song
app.get('/add', async (req, res) => {
  const favSong = new Song({
    songname: "MyFav",
    film: "MyFilm",
    music_director: "MyDirector",
    singer: "MySinger"
  });
  await favSong.save();
  res.redirect('/');
});

// (i) List songs by singer from film
app.get('/filter/:singer/:film', async (req, res) => {
  const songs = await Song.find({
    singer: req.params.singer,
    film: req.params.film
  });
  res.render('index', { songs, count: songs.length });
});

// (j) Update document to add actor and actress
app.get('/update/:name', async (req, res) => {
  await Song.updateOne(
    { songname: req.params.name },
    { actor: "MNO", actress: "PQR" }
  );
  res.redirect('/');
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));

/*
Insert sample data: Visit http://localhost:3000/insert (only once)

View all songs: http://localhost:3000/

Filter by Music Director: http://localhost:3000/director/GHI

Filter by Director & Singer: http://localhost:3000/director/GHI/singer/JKL

Delete a song: http://localhost:3000/delete/ABC

Add new song: http://localhost:3000/add

Filter by singer and film: http://localhost:3000/filter/JKL/DEF

Update actor/actress: http://localhost:3000/update/ABC
*/