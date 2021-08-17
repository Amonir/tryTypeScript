// (async  () => {
// 	const response = await prompts(selectionQuestions);
//   return response
// })();

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




// let stringToBeWrittenToFile = `${registration.username}-${registration.password}`;



// const readline = require('readline');

// const readInterface = readline.createInterface({
//         input: fs.createReadStream('name.txt'),
//         output: process.stdout,
//         console: false
//     });

// //  for (const line of readInterface) {
// //         console.log(line);
// //     }
// // //or
// readInterface.on('line', function(line) {
//     console.log(line);
// });




	// solution 2 didn't work
    // readLineFromFile('users.txt').then((line: any) => {
    //     savedUserInfo = line;
    //     console.log(savedUserInfo);
    //     if (userLoginInfo['username'] == savedUserInfo['username'] && userLoginInfo['password'] == savedUserInfo['password']) {
    //         console.log('welcome home', userLoginInfo['username']);
    //         const currentUser = userLoginInfo['username'];
    //     } else if (userLoginInfo['username'] == savedUserInfo['username'] && userLoginInfo['password'] != savedUserInfo['password']) {
    //         console.log('Password is wrong');
    //     } else {
    //         console.log('Entered username does not exist ');
    //     }
    // });




    // console.log("val",x)
					// var usersDict = new Array();
					// usersDict.push(JSON.parse(line));
					// console.log(usersDict)
					
					// let userExists = false;
					// let currentUser;
					// console.log(usersDict)
					// usersDict.forEach((savedUserInfo) => {
					// 	if (userLoginInfo['username'] == savedUserInfo['username'] && userLoginInfo['password'] == savedUserInfo['password']) {
					// 		console.log('welcome home', userLoginInfo['username']);
					// 		currentUser = userLoginInfo['username'];
					// 		userExists = true;
					// 		return;
					// 	} else if (userLoginInfo['username'] == savedUserInfo['username'] && userLoginInfo['password'] != savedUserInfo['password']) {
					// 		console.log('Password is wrong');
					// 		userExists = true;
					// 		return;
					// 	}
					// });
					// if (!userExists) {
					// 	console.log('Entered username does not exist ');
					// }
				// });