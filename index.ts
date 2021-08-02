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

(async () => {
    const response = await prompts({
      type: 'number',
      name: 'value',
      message: 'How old are you?'
    });
  
    console.log(response); // => { value: 24 }
    console.log('end of file')
  })();

