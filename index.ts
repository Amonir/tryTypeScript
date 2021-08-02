// import * as readline from 'readline';
const readline = require('readline');
const fs = require('fs');

let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

let username: string;
let password: string;
let path = 'users.txt';

console.log('Welcome to our Notes app');

const prompts = require('prompts');
function toto():void {


const res = (async () => {
    const response = await prompts({
      type: 'number',
      name: 'value',
      message: 'How old are you?',
      validate: value => value < 18 ? `Nightclub is 18+ only` : true
    });
  
    console.log(response); // => { value: 24 }
  })();
  }

console.log('end of file')
export{}
// rl.question('Are you a registered user ? [y/n] ', (answer) => {
// 	switch (answer.toLowerCase()) {
// 		case 'y':
// 			// enter user name pass
// 			break;
// 		case 'n':
// 			console.log('Sorry! lets register  :(');
// 			rl.question('Please enter user name. ', (enteredUsername) => {
// 				username = enteredUsername;
// 				rl.question('Please enter password. ', (enteredPassword) => {
// 					password = enteredPassword;
// 					let userString = username + '/' + password + ' ';
// 					fs.appendFile('user.text', userString, (err) => {
// 						if (err) throw err;
// 						console.log('user added');
// 					});
// 				});
// 			});
// 		// 	break;
// 		// default:
// 		// 	console.log('Invalid answer!');
// 	}
// 	rl.close();
// });
