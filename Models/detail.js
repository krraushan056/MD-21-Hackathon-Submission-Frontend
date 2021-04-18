var mongoose=require("mongoose");
var detailSchema=new mongoose.Schema({
    MettingName:String,
    MettingNo:String,
    NoOfPeople:String,
    Date:String,
    StartTime:String,
    EndTime:String
});

var detail=mongoose.model("detail",detailSchema);
module.exports=detail;



