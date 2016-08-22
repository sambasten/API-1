const Twitter = require('twitter');
const readline = require('readline');

const client = new Twitter({
	consumer_key: '0PoH6kw5aUTvzXiBrMxzbqsis',
	consumer_secret: 'bf0E2aEpcEhA9vL1X9FBSl0AgLy68hZp6u3stl7xLUu2KRCTIJ',
	access_token_key: '176463351-HfEF4ZB6qpRRKshTZUX4VdksalE3OMfO2wCMXT24',
	access_token_secret: 'MfvSEdumw3SkeXEWe3mMlTFhyOCjK4dlFgBYb6GeiE0Eq'
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What is on your mind? ', (answer) => {

  client.post('statuses/update', {status: answer}, function(err, data, response) {

  	console.log(data['text']);
  	
 }); 

  rl.close();
});