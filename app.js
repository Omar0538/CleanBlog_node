const express = require('express');
var methodOverride = require('method-override');

const app = express();
const mongoose = require('mongoose');
const { urlencoded, json } = require('express');
const ejs = require('ejs');
const photoController=require("./controllers/photoController")
const pageController=require("./controllers/pageController")
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
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

app.get('/',photoController.getAllPosts);
app.post('/posts',photoController.createPost);
app.put('/posts/:id',photoController.updatePost)
app.delete('/posts/:id',photoController.deletePost)
app.get('/posts/:id',photoController.getPost);

app.get('/add_post', pageController.getAddPage);
app.get('/about',pageController.getAboutPage);
app.get('/posts/edit/:id', pageController.getEditPage);

app.listen(port, () => {
  console.log(`Our server is getting start with this port:${port}`);
});
