// global variables

var fs = require("fs");
var keys = require('./keys.js');
var request = require("request");
var Twitter = require('twitter');
var spotify = require ("spotify");
var nodeArgs = process.argv[2];
var twitterKeys = keys.twitterKeys;


function tweet() {
	// set client to be defined by the keys in the keys.js file
	var client = new Twitter(twitterKeys);
	// sets the account name to look up and how many tweets to display
	var screenName = {screen_name: 'Marshall_Riddle', count: 20};
	// function to get the data from twitter and log it to the console
	client.get('statuses/user_timeline', screenName, function(error, tweets, response) {
		if (!error) {
			for (var i = 0; i < tweets.length; i++) {
				console.log(tweets[i].created_at + '\n' + tweets[i].text + '\n' +
							 '*************************\n');
    				}
    		}	
    	else {
    		// logging the error
    		console.log("error receiving tweets", error);
    	}
		
			
	});

};

function spotifyFind(song) {
	// establishing the input as the song name
	var songName = process.argv[3];
		if(!songName){
			songName = "The Sign";
		}
		// search function to look up the songname
		else {
			spotify.search({ type: "track", query: songName }, function(error, data) {
			if(!error){
				// loop to run through and then log the results
				for (var i = 0; i < 5; i++) {
					if (data[i] != undefined) {
						var spotifyResults =
						"Artist: " + data[i].artists[0].name + "\r\n" +
						"Title: " + data[i].name + "\r\n" +
						"Album: " + data[i].album.name + "\r\n" +
						"Preview: " + data[i].preview_url + "\r\n" + 
						"*************************" + "\r\n";
						console.log(spotifyResults);
						}
				}
				// logging an error
			}	else {
				console.log("Error :", error);
				return;
			}
		})
		};
	};
	


function movieTime() {
	// establishing input as the movie name
	var movie = process.argv[3];
			if(!movie){
				movie = "Mr. Nobody";
			}
			// requesting the url with the movie name added in
		request("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece&tomatoes=true", function (error, response, body) {
			if (!error && response.statusCode == 200) {
				var movieObject = JSON.parse(body);
				// returining and logging the movie description
				var movieDescription =
				"Title: " + movieObject.Title+"\r\n"+
				"Year: " + movieObject.Year+"\r\n"+
				"IMDB Rating: " + movieObject.imdbRating+"\r\n"+
				"Rotten Tomatoes Rating: " + movieObject.tomatoRating+"\r\n"+
				"Country: " + movieObject.Country+"\r\n"+
				"Language: " + movieObject.Language+"\r\n"+
				"Plot: " + movieObject.Plot+"\r\n"+
				"Actors: " + movieObject.Actors+"\r\n";

				console.log(movieDescription);
			// logging any error
			} else {
				console.log("Error :", error);
				return;
			}
		});

};

	function doIt() {
		// reading the text file and using its contents to search spotify
		fs.readFile("random.txt", "utf8", function(error, data){
			if (!error) {
				doItNow = data.split(",");
				spotifyFind(doItNow[0], doItNow[1]);
			} else {
				console.log("Error occurred", error);
			}
		});
	};
// switch case to match input to function
switch (nodeArgs) {
	case "my-tweets":
	  tweet();
	  break;
	case "spotify-this-song":
	  spotifyFind();
	  break;
	case "movie-this":
	  movieTime();
	  break;
	case "do-what-it-says":
	  doIt();
	  break;
	default:
		console.log("try another command");
}