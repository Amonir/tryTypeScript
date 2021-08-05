const prompts = require('prompts');
const fs = require('fs');
const readline = require('readline');
let username: string;
let password: string;
// let path = 'users.txt';
let firstSelection: { [key: string]: string };
let savedUserInfo: { [key: string]: string };
let userLoginInfo: { [key: string]: string };

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

const login = [
	{
		type: 'text',
		name: 'username',
		message: 'please enter your username?',
	},
	{
		type: 'password',
		name: 'password',
		message: 'please enter your password?',
	},
];

async function getUserSelection(): Promise<any> {
	const response = await prompts(selectionQuestions);
	return response;
}

async function getRegistration(): Promise<any> {
	const response = await prompts(register);
	return response;
}

async function getLogin(): Promise<any> {
	const response = await prompts(login);
	return response;
}

// solution 2 didn't work
// function readLineFromFile(filePath: string): any {
// 	const readInterface = readline.createInterface({
// 		input: fs.createReadStream(filePath),
// 		// output: process.stdout,
// 		console: false,
// 	});
// 	  readInterface.on('line', (line: any) => {
// 		console.log(line)
// 		return line;
// 	});

// for loop didn't work
// for await (const line of readInterface) {
// 	console.log(line)
// 	return line;
// }
// }

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
			getLogin().then((loginInfo: any) => {
				userLoginInfo = loginInfo;
				console.log('Entered Username: ', userLoginInfo['username']);


				// solution 3 didn't work
				// const readInterface = readline.createInterface({
				// 	input: fs.createReadStream('users.txt'),
				// 	// output: process.stdout,
				// 	console: false,
				// });
				// readInterface.on('line', (line: any) => {
				// 	savedUserInfo = line;
				// 	// console.log(line,'====', savedUserInfo,'compared to ', userLoginInfo)
				// 	console.log(userLoginInfo['username'], savedUserInfo['username']);
				// 	if (userLoginInfo['username'] == savedUserInfo['username'] && userLoginInfo['password'] == savedUserInfo['password']) {
				// 		console.log('welcome home', userLoginInfo['username']);
				// 		const currentUser = userLoginInfo['username'];
				// 	} else if (userLoginInfo['username'] == savedUserInfo['username'] && userLoginInfo['password'] != savedUserInfo['password']) {
				// 		console.log('Password is wrong');
				// 	} else {
				// 		console.log('Entered username does not exist ');
				// 	}
				// });

				// solution 2 didn't work
				// readLineFromFile('users.txt').then((line: any) => {
				// 	savedUserInfo = line;
				// 	console.log(savedUserInfo);
				// 	if (userLoginInfo['username'] == savedUserInfo['username'] && userLoginInfo['password'] == savedUserInfo['password']) {
				// 		console.log('welcome home', userLoginInfo['username']);
				// 		const currentUser = userLoginInfo['username'];
				// 	} else if (userLoginInfo['username'] == savedUserInfo['username'] && userLoginInfo['password'] != savedUserInfo['password']) {
				// 		console.log('Password is wrong');
				// 	} else {
				// 		console.log('Entered username does not exist ');
				// 	}
				// });

				// solution 1 working 

				const readInterface = readline.createInterface({
					input: fs.createReadStream('users.txt'),
					// output: process.stdout,
					console: false,
				});
				(async function () {
					var usersDict = new Array();
					for await (const line of readInterface) {
						// savedUserInfo = JSON.parse(line);
						usersDict.push(JSON.parse(line))
					}
					let userExists = false
					let currentUser;
					usersDict.forEach(savedUserInfo => {
						if ( userLoginInfo['username'] == savedUserInfo['username'] && userLoginInfo['password'] == savedUserInfo['password']) {
							console.log('welcome home', userLoginInfo['username']);
							currentUser = userLoginInfo['username']
							userExists = true
							return;
						}
						else if ( userLoginInfo['username'] == savedUserInfo['username'] &&  userLoginInfo['password'] != savedUserInfo['password']) {
							console.log('Password is wrong');
							userExists = true
							return
						}
					});
					if(!userExists){
						console.log('Entered username does not exist ');
					}
				})();
			});
			break;
		}
		case 'register': {
			getRegistration().then((registration: any) => {
				fs.appendFile('users.txt', JSON.stringify(registration) + '\n', function (err) {
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
