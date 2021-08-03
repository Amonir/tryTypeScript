// import prompts from 'prompts';
// import fs from 'fs';

const prompts = require('prompts');
const fs = require('fs');
let username: string;
let password: string;
let path = 'users.txt';
let firstSelection: { [key: string]: string };

const selectionQuestions = [
	{
		type: 'select',
		name: 'selection',
		message: 'What do you want to do today?',
		choices: [
			{ title: 'Login as a guest', value: 'guest' },
			{ title: 'Login as a registered user', value: 'login' },
			{ title: 'Register new user ', value: 'register' },
		],
	},
];

const register = [
	{
		type: 'text',
		name: 'username',
		message: 'please enter desired username?',
	},
	{
		type: 'password',
		name: 'password',
		message: 'please enter desired password?',
	},
];

// (async  () => {
// 	const response = await prompts(selectionQuestions);
//   return response
// })();

async function getUserSelection(): Promise<any> {
	const response = await prompts(selectionQuestions);
	return response;
}

async function getRegistration(): Promise<any> {
	const response = await prompts(register);
	return response;
}


console.log('Welcome to our Notes app');

getUserSelection().then((selection: any) => {
	firstSelection = selection;
	switch (firstSelection['selection']) {
		case 'guest': {
			console.log('activate guest app!');
			break;
		}
		case 'login': {
			console.log('activate login app!');
			break;
		}
		case 'register': {
			getRegistration().then((registration: any) => {
				console.log(registration);
				fs.appendFile('users.txt', registration, function (err) {
				  if (err) throw err;
				  console.log('Saved!');
				});
			});
			break;
		}
		default: {
			console.log('wrong choice obviously!!');
			break;
		}
	}
});


// console.log(firstSelection);

// switch (firstSelection['selection']) {
// 	case 'guest': {
// 		console.log('activate guest app!');
// 		break;
// 	}
// 	case 'login': {
// 		console.log('activate login app!');
// 		break;
// 	}
// 	case 'register': {
// 		console.log('activate register app!');
// 		break;
// 	}
// 	default: {
// 		console.log('wrong choice obviously!!');
// 		break;
// 	}
// }

// Asynchronously:

// const fs = require('fs');

// fs.appendFile('message.txt', 'data to append', function (err) {
//   if (err) throw err;
//   console.log('Saved!');
// });

// Synchronously:

// const fs = require('fs');

// fs.appendFileSync('message.txt', 'data to append');
