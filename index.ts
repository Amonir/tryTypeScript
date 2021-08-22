import { type } from "node:os";
import { couldStartTrivia } from "typescript";

const prompts = require('prompts');
const fs = require('fs');
const readline = require('readline');
let username: string;
let password: string;
// let path = 'users.txt';
let firstSelection: { [key: string]: string };
let userLoginInfo: { [key: string]: string };
let LoggedUserSelection: { [key: string]: string };

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

const afterLogin = [
	{
		type: 'select',
		name: 'selection',
		message: 'What do you want to do today?',
		choices: [
			{ title: 'Show current tasks', value: 'display' },
			{ title: 'Add Task', value: 'add' },
			{ title: 'remove tasks ', value: 'remove' },
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

async function getLoggedUserSelection(): Promise<any> {
	const response = await prompts(afterLogin);
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
async function readLineFromFile(filePath: string): Promise<any> {
	return new Promise((resolve) => {
		const readInterface = readline.createInterface({
			input: fs.createReadStream(filePath),
			// output: process.stdout,
			console: false,
		});
		let lines: Array<string> = [];
		readInterface.on('line', (line: any) => {
			lines.push(line);
			resolve(lines);
		});
	});
}
// for loop didn't work
// for await (const line of readInterface) {
// 	console.log(line)
// 	return line;
// }
// }

console.log('Welcome to our Notes app');

getUserSelection().then((selection: any) => {
	firstSelection = selection;
	console.log(typeof(firstSelection))
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

				// solution 2  working
				readLineFromFile('users.txt').then((lines) => {
					// console.log("lines :",JSON.parse(lines[0]))
					var usersDict = new Array();
					for (var singleLine of lines) {
						usersDict.push(JSON.parse(singleLine));
					}
					let userExists = false;
					let currentUser: string;
					usersDict.forEach((savedUserInfo) => {
						if (userLoginInfo['username'] == savedUserInfo['username'] && userLoginInfo['password'] == savedUserInfo['password']) {
							console.log('welcome home', userLoginInfo['username']);
							currentUser = userLoginInfo['username'];
							userExists = true;
							getLoggedUserSelection().then((selection: any) => {
								LoggedUserSelection = selection;
								switch (LoggedUserSelection['selection']) {
									case 'display': {
										readLineFromFile('tasks.txt').then((lines) => {
											var usersData = new Array()
											for(var line of lines){
												usersData.push(JSON.parse(line))
											}
											usersData.forEach((userData)=> {
												if(userData['username'] == currentUser){
													// console.log(userData['tasks'])
													console.log("tasks for logged in user ", currentUser)
													var tasks = userData['tasks'].split(',')
													tasks.forEach((task,index) => {
														console.log(`${index+1}- ${task}`)
													});
												}

											})
											
										});

										break;
									}
									case 'add': {
										console.log('add');
										break;
									}
									case 'remove': {
										console.log('remove');
										break;
									}
									default: {
										console.log('wrong choice obviously!!');
										break;
									}
								}
							});

							return;
						} else if (userLoginInfo['username'] == savedUserInfo['username'] && userLoginInfo['password'] != savedUserInfo['password']) {
							console.log('Password is wrong');
							userExists = true;
							return;
						}
					});
					if (!userExists) {
						console.log('Entered username does not exist ');
					}
				});

				// solution 1 working

				// const readInterface = readline.createInterface({
				// 	input: fs.createReadStream('users.txt'),
				// 	// output: process.stdout,
				// 	console: false,
				// });

				// (async function () {
				// 	var usersDict = new Array();
				// 	for await (const line of readInterface) {
				// 		// savedUserInfo = JSON.parse(line);
				// 		usersDict.push(JSON.parse(line));
				// 	}
				// 	let userExists = false;
				// 	let currentUser;
				// 	usersDict.forEach((savedUserInfo) => {
				// 		if (userLoginInfo['username'] == savedUserInfo['username'] && userLoginInfo['password'] == savedUserInfo['password']) {
				// 			console.log('welcome home', userLoginInfo['username']);
				// 			currentUser = userLoginInfo['username'];
				// 			userExists = true;
				// 			return;
				// 		} else if (userLoginInfo['username'] == savedUserInfo['username'] && userLoginInfo['password'] != savedUserInfo['password']) {
				// 			console.log('Password is wrong');
				// 			userExists = true;
				// 			return;
				// 		}
				// 	});
				// 	if (!userExists) {
				// 		console.log('Entered username does not exist ');
				// 	}
				// })();
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
