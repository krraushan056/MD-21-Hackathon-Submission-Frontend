var mongoose=require("mongoose");
var SearchSchema=new mongoose.Schema({
    search_name:String,
    from:String,
    to:String
});

var search=mongoose.model("search",SearchSchema);
module.exports=search;