require('dotenv').config();

var Twitter = require('twitter');
var readline = require('readline');
var progress= require('cli-progress');

var client = new Twitter({
	consumer_key: process.env.consumer_key,
	consumer_secret: process.env.consumer_secret,
	access_token_key: process.env.access_token_key,
	access_token_secret: process.env.access_token_secret
});


let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question('What functionality would you like to access? (search/post/timeline) ', function(reply){
	if(reply ===''){

		rl.close();
		console.log('Ha! we didnt forget to check please type in something');
	
	}

	else if (reply === 'search') {

		rl.question('What topic would you like to search twitter for? ', function(answer){
			
			if(answer ===''){
				rl.close();
				console.log('Ha! we didnt forget to check please type in something');
			}

			result = new Tweets(answer);
			loader(result.searchTweets);
			rl.close();

	    });
	}

	else if(reply==='post') {

		rl.question('What is on your mind ?', function(answer){
			
			if(answer ===''){

				rl.close();
				console.log('Ha! we didnt forget to check please type in something');
			}

			result = new Tweets(answer);
			loader(result.postTweets);
			rl.close();

		});
	}

	else if (reply === 'timeline') {

		rl.question('Whose timeline are you trying to view? ', function(answer){
			
			if(answer ===''){
				rl.close();
				console.log('Ha! we didnt forget to check please type in something');
			}

			result = new Tweets(answer);
			loader(result.userTimeline);
			rl.close();

	    });
	}

	else{
		rl.close();
	}
});



class Tweets {
/**
*Comstructor that accepts value passed in by user
*@param answer
*/
	constructor(answer) {
		this.answer = answer;
	}
/**
*Using HTTP GET verb
*This method fetches tweets that contains keyword passed in by user
*/
	searchTweets() {

		client.get('search/tweets', { q: this.answer, count: 5 }, function(err, data, response) {
			var tweet = data.statuses;
			var count = 5;

			for(let i = 0; i < count; i++){
				var tmp = tweet[i];
				if (tmp.text === undefined) return false;
				console.log(tmp.text + '\n');
			}
		}); 
	}

/**
*This method update new tweet by user using HTTP POST verb
*/
	postTweets() {
		client.post('statuses/update', {status: this.answer}, function(err, data, response) {
			console.log(' Your Tweet ' + data.text + ' has been updated');
		}); 
	}

	userTimeline() {
		client.get('statuses/user_timeline', { screen_name: this.answer, count: 5 }, function(err, data, response) {

			var count = 5;

			for(let i = 0; i < count; i++){
				var temp = data[i];
				if (temp.text === undefined) return false;
				console.log(temp.text + '\n');
			}
		}); 
	}
}

/**
*This function display a progress bar while user's request is being processed
*/
function loader(onComplete){
	let self = result;
    // EXAMPLE 2 ---------------------------------------------
    console.log('\nLoading tweets...');

    // create new progress bar using default values
    var b2 = new progress.Bar({
        barCompleteChar: '#',
        barIncompleteChar: '_',
        format: ' |- Loading: {percentage}%' + ' - ' + '||{bar}||',
        fps: 5,
        stream: process.stdout,
        barsize: 30
    });
    b2.start(100, 0);

    // the bar value - will be linear incremented
    var value = 0;

    // 50ms update rate
    var timer = setInterval(function(){
        // increment value
        value++;

        // update the bar value
        b2.update(value);

        // set limit
        if (value >= b2.getTotal()){
            // stop timer
            clearInterval(timer);

            b2.stop();

            // run complete callback
            onComplete.apply(self);
        }
    }, 6);
};