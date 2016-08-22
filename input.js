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

rl.question('Please enter a topic to track on twitter? ', (answer) => {
  // TODO: Log the answer in a database

 client.get('search/tweets', { q: answer, count: 5 }, function(err, data, response) {

  console.log(data);
}) 

  rl.close();
});