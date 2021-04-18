//npm i express ejs mongoose or required packages.
//start a server mongod
/// start mongodb shell mongo
const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const detail=require('./Models/detail');
const search=require('./Models/search');
var bodyparser=require("body-parser");
// 'mongodb://localhost:27017/MAYADATA-1'
mongoose.connect("mongodb+srv://raushan:w7JeeKLD4GkHY9gY@cluster0.dnkjh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
});


const db=mongoose.connection;
db.on("error",console.error.bind(console,"Connection error"));
db.once("open",()=>{
    console.log("DATABASE CONNECTED");
});

const app=express();




app.set("view engine",'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(__dirname + "/Public"));
app.use(bodyparser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
	detail.find({},function(err,allnewdetail){
		if(err){
			console.log(err)
		}else
			res.render("home",{detail:allnewdetail});
	})
})

app.get('/about',(req,res)=>{
	
		res.render("about");
	
})

app.post("/search",function(req,res){
    if(req.body && req.body.search_name){
        var search_name=req.body.search_name;
        console.log(search_name);
        var from=req.body.from;
        var to=req.body.to;
        detail.find({},function(err,allnewdetail){
            if(err){
                console.log(err)
            }else{
            var array=allnewdetail.filter(function (x){
                return x.MettingName===search_name;
            })

            var time=allnewdetail.filter(function(x){
                return (x.Date===from ||x.Date===to);
            })

            if(array.length){

            res.render("home",{detail:array});
            }
            else if(time.length){
                res.render("home",{detail:time});
            }else{
                res.redirect("/");
            }
            }
        });

      
       

        
    }
    else{
        res.redirect("/");
    }
})

app.post("/",function(req,res){
 if(req.body){
    var MettingName=req.body.MettingName;
    console.log(MettingName);
    var MettingNo=req.body.MettingNo;
    var NoOfPeople=req.body.NoOfPeople;
    var Date=req.body.Date;
    var StartTime=req.body.StartTime;
    var EndTime=req.body.EndTime;

var newdetail={MettingName:MettingName,MettingNo:MettingNo,NoOfPeople:NoOfPeople,Date:Date,
    StartTime:StartTime, EndTime: EndTime}

    console.log(newdetail);

detail.create(newdetail,function(err,newlycreated){
    if(err){
        console.log(err)
    }else
        {
            res.redirect("/");
        }
})
}
else{
    console.log("error");
}
});


app.post("/:id",function(req,res){
	detail.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/");
		}else
			{
				res.redirect("/");
			}
	})
})

app.get("*",function(req,res){
	res.render("/");
})




app.listen(process.env.PORT,process.env.IP,function(){
	console.log("SERVER STARTED");
})
