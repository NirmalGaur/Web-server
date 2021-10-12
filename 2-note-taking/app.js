// Here, we'll see gone of the most fundamental features of Node: the $_ MODULE SYSTEM , which allow us to take advantage of all of the cool and interesting things that Node provides.
// Some of the modules like console are available globally, which means we don't have to do anything special to use them. But Others require us to actually load them in before they can be used in our scripts.
// And the module we're going to use to explore this is the $_ FILE SYSTEM MODULE. This is the module that's going to allow us to access the operating systems file system will be able to read and write, append files and figure out if a given file or directory exists.
// In this module we have hundreds of methods, one of them is fs.writeFile which is the method that's going to allow us to write some data to a file on our file system from the node.js application. It has two versions: Async and Sync.
// Now down below inside of the terminal, we first switch directories from node-course to current folder by using 'cd space <foldername>'. Now we're actually running commands from that directory

// Before we use the filesystem module, We're going to go ahead and load it in. And this is done using the require function that node provides.
// $_ REQUIRE FUNCTION is how we load in other things like core node modules, other files we created, or a NPM module we've choosen to install and use in our projects.
// For the $_ CORE NODE MODULE, in the require function we pass in a single string, which is the name of the module:

const fs = require('fs');

// Note that this variable fs could be called anything. The only important thing is that the string we passed to require matches up with what node calls the module. Otherwise node is not going to know which module you're trying to load.

fs.writeFileSync('notes.txt', 'This file was created by Node.js!.'); // this takes two arguments, both are strings. The first is the name of the file and the second is the data to write.

//So the write.FileSync method is responsible for writing data to a file. If the file doesn't exist, it will be created. If the file does exist, its text content will be overwritten with the new provided message.

// Append a message to the file:
fs.appendFileSync('notes.txt', ' This is the appended text...');

// Another used case of require function is to load in EXTERNAL FILE you've created. If we want to run some another file, we have to require it for that file to actually get loaded in. And we're still going to pass in a string. Now, when we're loading in a file that we created in our application, we start with dot forward slash. We have to provide a relative path from the file we're loading it in (app.js), to the file we're actually trying to load (utility.js).

require('./utility.js');

// app.js cannot access the variables from utility.js even though it was loaded in with require.
// Hence we need to explicitly EXPORT all of the stuff that utility.js file should share with the outside world. To do this, we use another aspect of the module system: $_ module.exports. This is where we can define all of the things that file utility.js should share with other files.

const userName = require('./utility.js'); // return variable from module.exports in utility.js
// SHOW: console.log(userName);

// We were able to use module.export to export the name variable and we were able to load it in over here with require.

// Whatever we assign to module.exports, that is available as the return value from when you require the file. That returned value can also be a fucntion.
const add = require('./utility.js'); // return function add from utility.js
const sum = add(4, -2);
// SHOW: console.log(sum);

// Load in the getNotes function from notes.js:
const notes = require('./notes.js');
// SHOW: notes();

// We can use module system to load in $_ NPM PACKAGES. There are things that every appliaction needs to do like validation emails, et cetra. These are core functionality and not specific that our app does for the user. So if we use NPM modules to solve common problems, then we can focus on features that make our app unique.
// When we install node, we also get the NPM program installed in our machine which gives us access to everything over at npmjs.com
// Now before we use any of the npm module in our script, we have to initialise npm in our project, and then we have to install all of the modules we actually want to use.
// To initialise npm in our project, we have to run a single command from the project root directory (2-note-taking folder here). This command is npm init
// Now for every question, we'll stick with the default value by pressing enter each time. At last we type yes.
// This creates a new json (javaScript object notation) file in our project.
// This file is used to manage all the dependencies that our app needs to run. So in there we will list out all the npm packages we want to use.
// For that we would go to npmjs.com and find the package we want to work with, For example, $_ validator package. Now in the terminal we write npm install validator@10.8.0
// Now when we run this, its gonna go to npm servers and grab all of the code of that package, and add it into our application.
// After that, we will get a file called package-lock.json, and we get a new directory: node_modules, a directory to which we should not be editing.
// Both of these are maintained by npm. The package-lock.json file contains extra information making npm a bit faster and a bit more secure. This file should not be edited manually.

// To load in an npm package, we need require. In the require funtcion we will list out the string for the npm package name. The require will return all of the stuff that the validator package will provide us:

const validator = require('validator');

// Now to figure out how to use a package, we have to see the documentation page of the package and npmjs.com
// There we can see hundereds of methods in the validator object. We will use one the method from there called isEmail(str [, options]):

// SHOW: console.log(validator.isEmail('gmail.com'));
// SHOW: console.log(validator.isURL('https://mead.io'));

// For larger applications, the node_modules directory can get really big, So we might wanna delete it if we were to share the code with a friend or if we were to add it to our own gitHub repository. We can always get that folder back when we download the project by running 'npm install' in the terminal (no need to specify the version, that is already specified in the json files).

// Installing Some other npm library: $_ chalk, that costomise how the text get printed in the console.

const chalk = require('chalk');
// SHOW: console.log(chalk.red.inverse('Success!'));
// SHOW: console.log(chalk.italic.bold.black.bgWhite('Success!'));

// $_ GLOBAL NPM PACKAGES: So far all of the packages we've worked with are called locally installed packages, where we install the packages explicitly in our project. But when we install a module globally, we don't load it in directly in our source file instead we install it globally and it gives us access to a new command we can use from the terminal. Global npm modules allow us to get a new command we can execute from the terminal.
// Now here we're gonna install a npm module globally that will allow us to run our app and automaticaly restart the app whenever the app code changes. The package we'll use is called the nodemon.
// Now to install a module globally we just need to add -g after the command we use when we install a module locally.
// Now we would run our script by writing "nodemon app.js" instead of "node app.js"
// In the terminal, we can see it says "waiting for changes before restart".
// We can stop nodemon by going to the terminal and using Ctrl + C. This will bring us back to the command promt where we can do something else like install a new module.

// $_ GETTING THE INPUT FROM THE USER using Command Line Arguments:
// For this, we run our script through the node command with one slight modification, we add another space followed by a value, e.g.: node app.js Hello
// We've now provided an additional info that our program can choose to use to do something dynamic. To access those CLA, we will use the global variable called process. On process, we have a property called argument vector, where we can access all of the CLA.

// SHOW: console.log(process.argv);

// Here we get three strings inside an array where first two are always provided, but the third is the value that we actually provided.

// SHOW: console.log(process.argv[2]);

// Here we can use 'add' and 'remove' as the value to add notes or remove note from our notes app.
// To check which note to add or remove we can provide an additional CLA, we would do: node app.js add --title="This is Title"
// This adds a fourth string inside the argument vector property:

// SHOW: console.log(process.argv);

// Node does'nt provide the lot of argument parsing. It is upto the npm packages to solve the parsing problem. One of them is called $_ yargs: npm i yargs@12.0.2
const yargs = require('yargs');
const { title } = require('process');
// SHOW: console.log(yargs.argv); // this gives us an object with two properties
// after setting the command (add/remove) and the title as we done previously, the command shows up in the underscore (_) property and have a property named title in it.

// Customize yargs version:
yargs.version('1.1.0');

// Create ADD COMMAND:
yargs.command({
  command: 'add', // Name for the command
  describe: 'Add a new note',
  builder: {
    // value is the object where we can define all of the option we want the command to support
    title: {
      describe: 'Note title', // we can access this in the command handler and we can access to the arguments via the argument passes to the handler
      demandOption: true, // Now we have to provide the title inorder to run the command correctly
      type: 'string', // title value shoul always be a string
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    // code that runs when someone uses the 'add' command
    notes.addNote(argv.title, argv.body);
  }, // So we give this function to yargs, and when the command is executed yargs runs the handler function and calls it with argv.
}); // Now we have a new commands section we can see by typing node app.js --help

// Create REMOVE COMMAND:
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

// Create LIST COMMAND:
yargs.command({
  command: 'list',
  describe: 'List the notes',
  handler(argv) {
    notes.listNotes(argv);
  },
});

// Create READ COMMAND:
yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

// to run all the commands we do:
yargs.parse();
