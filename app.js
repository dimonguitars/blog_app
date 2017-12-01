var express = require('express');
var path = require('path');
var query = require('./query');
var bodyParser = require('body-parser');
var app = express();


app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'views')));
// app.use(bodyParser.urlencoded({ extended: false }));

var all_messages = [];
function get_all_messages(){
  return new Promise (function(resolve, reject) {
    query('select * from posts', function(err, results){
      if(err){
        reject(err);
        }
        resolve(results.rows)
        results.rows = all_messages;
      });
    });
}

//home route
app.get('/', function(req, res){
    res.render('index',{
     title : 'Welcome to Blog',
  });
});

//articles route
app.get('/articles', function(req, res){
  res.render('articles',{
   title: 'Write a post'
  });
});

//blog page with all messages
app.get('/blog', function(req, res){
  get_all_messages().then(function(all_messages){
    all_messages = all_messages.reverse();
    res.render('blog',{
     title: 'Post from users :',
     messages: all_messages,
    });
  })
  });


// adding new post
app.get('/add-articles', function(req, res){
  query(`insert into posts (username, title, message) values ('${req.query.username}', '${req.query.title}', '${req.query.message}')`)

  res.redirect('/blog');
});




app.listen(3000, function(){
  console.log('Server running on port 3000');
});
