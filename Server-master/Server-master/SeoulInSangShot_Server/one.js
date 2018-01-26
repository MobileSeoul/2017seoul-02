var express = require('express');
var app = express();


//get 하는 함수들은 get.js를 통해서 만들어짐
var getfile = require('./get');
app.use('',getfile);

// //post 하는 함수들은 post.js를 통해서 만들어짐
var postfile = require('./post');
app.use('',postfile);


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
