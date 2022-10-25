//1st
// var http = require('http');
// var port = 3000;

// var server = http.createServer(function (req,res){

// 	if(req.method == 'GET')
// 	{
// 		if(req.url == '/')
// 		res.end("it is Home Page");
// 		else if(req.url == '/about')
// 		res.end('its is about');
// 		else if(req.url == '/contactUs')
// 		res.end("its contact us");
// 		else
// 		res.end("Invalid Get request");
// 	}
// 	else
// 	res.end("it's POST request");
// });
// server.listen(port, console.log(`servering running at ${port}`));
// console.log("jjjjj");


//2nd
// var http=require("http")
// var fs=require("fs")


// http.createServer(function(req,res){
//     var method=req.method;
//     var url=req.url;
// 	console.log(method,url);
//     if(method==="GET"){
//         if(url==="/"){
//             fs.readFile("./todo/index.html","utf-8",function(err,data){
//                 if(err){
//                     res.end("something bad happen")
//                 }
//                 else{
//                     res.end(data)
//                 }
//             })
//         }
// 		else if(url==="/script.js"){
// 			fs.readFile("./todo/script.js","utf-8",function(err,data){
//                 if(err){
//                     res.end("something bad happen")
//                 }
//                 else{
//                     res.end(data)
//                 }
//             })
// 		}
//     }

// }).listen(3000,function(){
//     console.log("server is live at port 3000");
// })

var express=require("express");


var fs=require("fs")
var app= express();

app.use(logger);

app.use(express.json())  //ye jo data frontend se bheja jata use nikal k client se convert krke req k andar m chipka deti h
app.use(express.static("todo"))


// app.get("/",function(req,res){
// 	fs.readFile("./todo/index.html","utf-8",function(err,data){
// 		res.end(data)
// 	 })
// })

// app.get("/script1.js",function(req,res){
// 	fs.readFile("./todo/script1.js","utf-8",function(err,data){
// 		res.end(data)
// 	})
// })
app.post("/save",function(req,res){
	fs.readFile("./db.txt","utf-8",function(err,data){
		var todos=[];
		if(data.length>0)
		{
			todos=JSON.parse(data)
		}
		todos.push(req.body);
		fs.writeFile("./db.txt",JSON.stringify(todos),function(){
           if(err){
			res.end("error occured")
		   }
		   else{
			res.end();
		   }
		})
	})
})



app.post("/delete",function(req,res){
	// console.log(req.body.todo);
	console.log(req.body.key);
    fs.readFile("./db.txt","utf-8",function(err,data){
		 var alltodos=JSON.parse(data)
		 var result=alltodos.filter((ele)=>{
           if(ele.todo!=req.body.key){
			   return ele; 
			}
		})
	fs.writeFile("./db.txt",JSON.stringify(result),function(){  
		if(err){
			res.end("err aayi")
		}
		else{
			res.end('Delete successfull');
		}
	})
})
})

app.post("/update",function(req,res){
	console.log(req.body.newTodo);
	console.log(req.body.oldTodo);

	fs.readFile("./db.txt","utf-8",function(err,data){
		var allTodos=JSON.parse(data)
		console.log(req.body.newTodo);
		// console.log("nn");
		var result=allTodos.map((ele)=>{
			if(ele.todo== req.body.oldTodo)
			return req.body.newTodo;
			else
			return ele.todo;
		})
		console.log(result);
		fs.writeFile("./db.txt",JSON.stringify(result),function(){  
			if(err){
				res.end("err aayi")
			}
			else{
				res.end('Edit successfull'); 
			}
		})
	})
})



app.post("/todo",function(req,res){
	fs.readFile("./db.txt","utf-8",function(err,data){
		res.end(data);
	})
})

function logger(req,res,next){
	next()
}

app.listen(3000,function(){
	console.log("app is live");
	
})