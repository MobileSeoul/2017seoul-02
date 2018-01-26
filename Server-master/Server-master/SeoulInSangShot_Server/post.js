var express = require('express');
var app = express();
var route = express.Router();
var mysql = require('mysql');
var conn = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'dnjsxnvjscl',
	port : 3306,
	database : 'OneTwoPunch'
});
var bodyParser = require('body-parser'); //body-parser 사용 post방식 사용 ,미들웨어 
var multer = require('multer'); 
// 업로드 시 필요
var _storage = multer.diskStorage({
	destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
 	filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: _storage })
// //multer가 동작하면서 _storage를 사용한다고 명시

route.use('/user',express.static('uploads'));
route.use(express.static('image'));


//bodyParser의 true값은 url 인코딩이 계속 적용될지 한번만 적용될지 묻는것
route.use(bodyParser.json({limit: "50mb"}));
route.use(bodyParser.urlencoded({limit: "100mb", extended: true,parameterLimit:50000}));

//사진 업로드
route.post('/tupload',function(req,res){
	require("fs").writeFile("uploads/"+ req.body.photoName +".png", req.body.base64, 'base64', function(err) {
  });
  	var id=req.body.pic_id;
	var photoName=req.body.photoName;
	var area=req.body.area;
	var phoneType=req.body.phoneType;
	var phoneApp=req.body.phoneApp;
	var season=req.body.season;
	var time=req.body.time;
	var tip=req.body.tip;
	var nowdate=req.body.nowdate;
	var url="http://13.124.87.34:3000/user/"+photoName+".png";
	var sql = "INSERT INTO photoUp (id, area, url, phoneType, phoneApp, season, time, tip, nowDate) VALUES ('" + id + "','" + area + "','" + url + "','" + phoneType + "','" + phoneApp + "','" + season + "','" + time + "','" + tip + "','" + nowdate + "')";
	conn.query(sql,function(err,result){
			if(err) throw err;
			console.log("1 insert")
	});
	res.json({ response: 'success' });
});


//댓글 쓰기
route.post('/preply', function(req,res){
	var id=req.body.id; // 댓글다는 사람 아이디
	var init=req.body.init; // 위치 정보
	var text = req.body.text; // 코멘트 
	var date = req.body.date;

	var sql= "INSERT INTO QnA(init, id, text, date) VALUES ('"+init+ "','" + id + "','" + text + "','" + date + "')";
	conn.query(sql,function(err,result){
			if(err) throw err;
			console.log("1 insert")
	});
	res.json({ response: 'success' });
});

//뽐내기 댓글
route.post('/pviewreply', function(req,res){
	var id=req.body.id; // 댓글다는 사람 아이디
	var url=req.body.url; //사진
	var text = req.body.text; // 코멘트 
	var date = req.body.date; //날짜

	var sql= "INSERT INTO JaRangQnA(url, id, date, text) VALUES ('"+url+ "','" + id + "','" + date + "','" + text + "')";
	conn.query(sql,function(err,result){
			if(err) throw err;
			console.log("1 insert")
	});
	res.json({ response: 'success' });
});


//좋아요 기능
route.post('/plike', function(req,res){
	var url=req.body.url; // 댓글다는 사람 아이디
	var id=req.body.id; // 위치 정보
	
	var sql= "INSERT INTO likeimg(url,id) VALUES ('" + url + "','" + id + "')";
	conn.query(sql,function(err,result){
			if(err) throw err;
			console.log("like 1 insert")
	});
	res.json({ response: 'success' });
});

//좋아요 취소 기능
route.post('/dellike', function(req,res){
	var url=req.body.url; // 댓글다는 사람 아이디
	var id=req.body.id; // 위치 정보
	
	var sql= 'DELETE FROM likeimg WHERE url = ' + '"'+ url + '"' + 'AND id =' + '"' + id + '"';
	conn.query(sql,function(err,result){
			if(err) throw err;
			console.log("1 delete")
	});
	res.json({ response: 'success' });
});

//조회수 기능
route.post('/pview', function(req,res){
	var url = req.body.url;
	var sql = 'UPDATE imagechg SET hit=hit+1 WHERE url = ' + '"' + url + '"';
		conn.query(sql,function(err,result){
			if(err) throw err;
			console.log("view 1 insert")
	});
	res.json({ response: 'success' });
});

module.exports = route;