var twitterData = require("./keys.js");
var request = require("request");
var twitter = require('twitter');
var nodeArgs = process.argv[2];

switch (nodeArgs) {
	case "my-tweets":
	  tweet();
	  break;
	case "spotify-this-song":
	  spotify();
	  break;
	case "movie-this":
	  movie();
	  break;
	case "do-what-it-says":
	  doIt();
	  break;
	default:
		console.log("try another command");
}

function tweet() {
	client.get('favorites/list', function(error, tweets, response) {
		if (error) {
      return console.log(error);
    }
	}
}
