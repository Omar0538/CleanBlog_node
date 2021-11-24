const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { urlencoded, json } = require('express');
const ejs = require('ejs');

const Post = require('./models/Post');

const port = 3000;

mongoose.connect('mongodb://localhost/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//template engine
app.set('view engine', 'ejs');

//middlewares
app.use(express.static('public'));
app.use(urlencoded({ extended: false }));
app.use(json());

app.get('/', async (req, res) => {
  const posts = await Post.find({});
  res.render('index', {
    posts,
  });
});
app.get('/add_post', (req, res) => {
  res.render('add_post');
});
app.get('/post/:id', async (req, res) => {
  const id = req.params.id;
  const post = await Post.findById(id);
  res.render('post', {
    post,
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});

app.post('/posts', (req, res) => {
  Post.create(req.body);
  res.redirect('/');
});
app.listen(port, () => {
  console.log(`Our server is getting start with this port:${port}`);
});
