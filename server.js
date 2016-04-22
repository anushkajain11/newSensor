var express = require('express');
var app = express();
var mongodb = require("mongodb");
var path = require('path');


var MongoClient = require('mongodb').MongoClient;

var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/clouddb';

var dbHandle = null;
var virtualSensorCollection = null;
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.set('view engine','html');
 MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {

    	dbHandle = db;
    	//virtualSensorCollection = db.collection('Sensor1');

      //HURRAY!! We are connected. :)
     // console.log('Connection established to', url);

      // do some work here with the database.

      //Close connection
	  
      //db.close();
  }
});

/*app.post("/sensorapi/addvirtualsensor", function (request, response) {

	console.log(request.body);
	var Temperature = request.body.Temperature;
	var Pressure= request.body.Pressure;
  var virtualSensor = {
		Temperature: Temperature,
		Pressure: Pressure,
		status: false,
		date: new Date()

	};*/
	/*var t = new Array();
for (var i=1; i<60;i++)
{
	t[i]= Math.floor((Math.random()*100)+1);
	Sensor1.insert({"Temperature " : t[i]});
}*/
	
	/*var resultResponse = {
		status: true
	};*/
	

	/*Sensor1.insert(virtualSensor, function (err, result) {
      if (err) {
        console.log(err);
        result.status = false;
      } else {
        console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);

      }
       response.json({result: resultResponse});
     
    });*/

/*String Temperature;
	){
		Temperature = "day"+[i]+":"+new Random(100);
		for(var i=0; i<50; i++)
		db.Sensor1.insert(
		{	"Temperature":{rand : Math.random()} })
	}*/
	
/*var t = new Array();
for (var i=1; i<60;i++)
{
	t[i]= Math.floor((Math.random()*100)+1);
	dbHandle.Sensor1.insert({"Temperature " : t[i]});
}
Sensor1.find().pretty();*/

app.get('/Page1', function (req, res) {
  //res.sendFile('./map.html');
  console.log('Connection established to', url);
  var collection = dbHandle.collection('Sensor1').find();
	collection.each(function(err,docs){
		if(docs != null){
			console.log(docs);
			
			//var myName = docs.name;
            //console.log (tojson(myName));
		}
		   
});
		//collection.forEach( function(docs) { print( "Name: " + docs.name ); } );
	
	//var myDocument = dbHandle.Sensor1.findOne();


 
//response.sendFile(__dirname + "/pages/listvirtualsensor.html");
  //res.sendFile(path.join(__dirname+'/map.html'));
  res.sendFile('/Page1.html' , { root : __dirname});
 });
 
 app.get('/Page2', function(req,res) {
    //data= fs.readFile('/home/swift-03/WebstormProjects/website/static/HTML/contactus.html',   function (err, data) {
    //res.setHeader('Content-Type', 'text/html');
    res.sendFile('/Page2.html' , {root : __dirname});
});
 
 function getData(responseObj){
  //use the find() API and pass an empty query object to retrieve all records
  dbHandle.collection("Sensor1").find({}).toArray(function(err, docs){
    if ( err ) throw err;
    var temperature = [];
    var pressure = [];
    var day = [];

    for ( index in docs){
      var doc = docs[index];
      //category array
      var day1 = doc['day'];
      //series 1 values array
      var temperature1 = doc['temperature'];
      //series 2 values array
	  	  console.log(doc['Temperature'])

      var pressure1 = doc['pressure'];
      day.push({"label": day1});
      temperature.push({"value" : doc['Temperature']});
      pressure.push({"value" : pressure1});
    }

    var dataset = [
      {
        "seriesname" : "Temperature",
        "data" : temperature
      },
      {
        "seriesname" : "Pressure",
        "data": pressure
      }
    ];

    var response = {
      "dataset" : dataset,
      "categories" : day
    };
    responseObj.json(response);
  });
}	

app.get("/Page1", function(req, res){
var obj = getData(res);
res.render('index',{"title":obj});
});
//app.get("/", function(req, res){
  //res.render("chart");
//});


 /*var myDocument = dbHandle.collection('Sensor1').findOne();

if (myDocument) {
   var myName = myDocument.name;

   print (tojson(myName));
}*/

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

