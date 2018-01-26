var express = require('express');
var route = express.Router();
var mysql = require('mysql');
var conn = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'dnjsxnvjscl',
	port : 3306,
	database : 'OneTwoPunch'
});


route.get('/upload',function(req, res){
	var sql = 'SELECT DISTINCT photoUp.*, (SELECT COUNT(*) FROM likeimg WHERE likeimg.url=photoUp.url) AS likecount FROM photoUp,likeimg ORDER BY likecount DESC, num ASC';
  	conn.query(sql,function(err,rows,fields){ 
  	res.json({
			list: rows 
    });
  });
});

route.get('/reply',function(req, res){
	var sql = 'SELECT * FROM QnA';
  	conn.query(sql,function(err,rows,fields){ 
  	res.json({
			list: rows 
    });
  });
});

//전체 이미지와 내용들
route.get('/image',function(req, res){
	var sql = 'SELECT imagefix.number, imagefix.area, imagefix.init, imagefix.name, eimagefix.name as ename ,imagefix.lat, imagefix.lng, imagefix.subway, imagefix.bus, imagefix.bicycle, imagechg.url, imagechg.smartphone, imagechg.filter, imagechg.theme1, imagechg.theme2, imagechg.info , imagechg.tip, imagechg.hit FROM imagechg,imagefix,eimagefix WHERE imagechg.init=imagefix.init AND imagefix.init=eimagefix.init ORDER BY imagefix.number ASC, imagechg.number ASC';
  	conn.query(sql,function(err,rows,fields){ 
  	res.json({
			list: rows 
    });
  });
});

route.get('/eimage',function(req, res){
  var sql = 'SELECT DISTINCT eimagefix.init, imagefix.area ,eimagefix.name, imagefix.name as ename, imagefix.lat, imagefix.lng,eimagefix.subway, eimagefix.bus, eimagefix.bicycle, imagefix.url, eimagechg.smartphone, eimagechg.filter, eimagechg.theme1, eimagechg.theme2, eimagechg.info, eimagechg.tip, imagechg.hit FROM eimagefix, eimagechg, imagefix, imagechg WHERE eimagechg.init=eimagefix.init AND imagefix.init=eimagefix.init AND imagefix.url = imagechg.url ORDER by imagechg.hit DESC';
    conn.query(sql,function(err,rows,fields){ 
    res.json({
      list: rows 
    });
  });
});

//main 화면에서 활용
route.get('/top7',function(req, res){
  var sql = 'SELECT imagefix.init, imagefix.area ,imagefix.name, eimagefix.name as ename,imagefix.lat, imagefix.lng, imagefix.url, imagechg.theme1, imagechg.theme2, imagechg.smartphone, imagechg.filter, imagefix.bus, imagefix.subway, imagefix.bicycle, imagechg.info,imagechg.tip ,imagechg.hit FROM imagefix,eimagefix,imagechg WHERE imagefix.init=eimagefix.init and imagechg.url=imagefix.url ORDER BY hit DESC LIMIT 7';
    conn.query(sql,function(err,rows,fields){ 
    res.json({
      list: rows 
    });
  });
});

route.get('/etop7',function(req, res){
  var sql = 'SELECT imagefix.area, eimagefix.init, eimagefix.name,imagefix.name as ename, imagefix.lat, imagefix.lng, imagefix.url, eimagechg.theme1, eimagechg.theme2, eimagechg.smartphone, eimagechg.filter, eimagefix.subway, eimagefix.bus, eimagefix.bicycle, eimagechg.info ,eimagechg.tip, imagechg.hit FROM eimagefix, imagefix, imagechg, eimagechg WHERE eimagefix.init = imagefix.init and eimagechg.init = eimagefix.init AND imagechg.init = eimagechg.init ORDER by imagechg.hit DESC LIMIT 7';
    conn.query(sql,function(err,rows,fields){ 
    res.json({
      list: rows 
    });
  });
});

//지도로보기 정보들 민건
route.get('/mainview',function(req, res){
	var sql = 'SELECT DISTINCT Areainfor.area, Areainfor.karea, Areainfor.earea, (SELECT COUNT(imagefix.area) FROM imagefix WHERE imagefix.area=Areainfor.area ) AS imagecount, (SELECT sum(imagechg.hit) FROM imagechg WHERE imagechg.area=Areainfor.area) AS hit FROM Areainfor';
  	conn.query(sql,function(err,rows,fields){ 
  	res.json({
			list: rows 
    });
  });
});

//좋아요 활용
route.get('/likeimg',function(req, res){
  var sql = 'SELECT * FROM likeimg';
    conn.query(sql,function(err,rows,fields){ 
    res.json({
      list: rows 
    });
  });
});

//테마로 보기 활용
route.get('/themeview',function(req, res){
  var sql = 'SELECT theme.* FROM theme ';
    conn.query(sql,function(err,rows,fields){ 
    res.json({
      list: rows 
    });
  });
});
//SELECT theme.*, (SELECT count(*) FROM imagechg WHERE imagechg.theme1=theme.themename) as ktheme FROM theme ORDER by ktheme DESC


//뽐내기의 대한 댓글에서 사용
route.get('/viewreply',function(req, res){
  var sql = 'SELECT * FROM JaRangQnA';
    conn.query(sql,function(err,rows,fields){ 
    res.json({
      list: rows 
    });
  });
});

//조회수 활용
route.get('/hit',function(req, res){
  var sql = 'SELECT DISTINCT imagefix.init, imagechg.hit FROM imagechg, imagefix WHERE imagefix.url = imagechg.url';
    conn.query(sql,function(err,rows,fields){ 
    res.json({
      list: rows 
    });
  });
});

//좋아요 활용
route.get('/likes',function(req, res){
  var sql = 'SELECT photoUp.url , photoUp.area, (SELECT count(*) FROM likeimg WHERE photoUp.url=likeimg.url) AS likes FROM photoUp';
    conn.query(sql,function(err,rows,fields){ 
    res.json({
      list: rows 
    });
  });
});

//공지사항
route.get('/Notice',function(req, res){
  var sql = 'SELECT * FROM Notice';
    conn.query(sql,function(err,rows,fields){ 
    res.json({
      list: rows 
    });
  });
});

//영어 공지사항
route.get('/eNotice',function(req, res){
  var sql = 'SELECT * FROM eNotice';
    conn.query(sql,function(err,rows,fields){ 
    res.json({
      list: rows 
    });
  });
});


module.exports = route;
