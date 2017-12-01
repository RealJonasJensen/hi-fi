//Require necessary modules
var express = require("express");
var app = express();
var request = require("request");

//Kigger efter .ejs filer så jeg ikke behøver .ejs i routes
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("home");
});

app.get("/movie/:title", function(req, res){
    var query = req.params.title;
    var url = `http://www.omdbapi.com/?t=${query}&plot=full&apikey=thewdb`
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            console.log(data);
            res.render("movie", {data: data});
        }
    });

})

app.get("/results", function(req, res){
    console.log(req.query)
   var query = req.query.term;
   var url = `http://www.omdbapi.com/?s=${query}&apikey=thewdb`

    request(url, function(error, response, body){

        if(!error && response.statusCode == 200) {
        var data = JSON.parse(body);
        res.render("results", {data: data});
        }
    });
});

app.get("*", function(req, res){
    res.send("Alle sider");
})

//Local server
var server = app.listen(process.env.PORT || 5000);