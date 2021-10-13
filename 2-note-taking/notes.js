const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
  console.log('Your Notes...');
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

// The first thing we need to  do us to load in the existing notes. We don't want addNote to overwrite any data. So we use loadNotes function that returns an array of notes:
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

// $_ ADD NOTE:
const addNote = (title, body) => {
  const notes = loadNotes();
  // To avoid the duplicate notes:
  // $_ const duplicateNotes = notes.filter(function (note) {
  // filter is an array method that returns a subset of the notes array depending on the criteria defined on the function passed.
  // return note.title === title; // This function runs for each element in the notes array. If the current title matches with any of the note.title then it returns true and title gets added to the duplicateNotes
  // }); //Note that everytime we are adding a note, duplicateNotes array gets defined (initial length 0)

  const duplicateNote = notes.find(note => note.title === title); // unlike the filter method, here we stop as soon the duplicate is found

  debugger; // explained below

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes); //pass the resulting array to get converted into json
    console.log(chalk.green.inverse('New note added!'));
  } else {
    console.log(chalk.red.inverse('Note title taken!'));
  }
};

//$_ REMOVE NOTE:
const removeNote = title => {
  const notes = loadNotes();
  const notesAfterdelete = notes.filter(note => note.title !== title);
  if (notes.length === notesAfterdelete.length) {
    console.log(chalk.red.inverse('Note not found'));
  } else {
    saveNotes(notesAfterdelete);
    console.log(chalk.green.inverse('Note deleted'));
  }
};

//$_ LIST NOTES:
const listNotes = () => {
  console.log(chalk.cyan.inverse('Your Notes:'));
  const notes = loadNotes();
  notes.forEach(note => {
    console.log(note.title);
  });
};

//$_ READ NOTE:
const readNote = title => {
  const notes = loadNotes();
  const foundNote = notes.find(note => note.title === title);
  if (foundNote) {
    console.log(chalk.green.inverse(foundNote.title), foundNote.body);
  } else {
    console.log(chalk.red.inverse('No Note found!'));
  }
};

// To export more that one things from notes.js, we're going to set module.exports equal to an object in which we can define multiple properties for the multiple functions we end up creating:
module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};

//$_ DEBUGGER is node's built in debugging tool which integrates with V-Eight and the Chrome browser. The debugger need to be at a specific point in our application, thats gonna stop the application at that point.
// Debugger does not pause the application by default, for that we need to add 'inspect' after the 'node' in our command: node inspect app.js add --title="course' --body="nodejs"
// Now we have to go to chrome and type url: chrome://inspect
// There we can click 'inspect' below the 'Target'. This open a new window of the developer tools.
// There we can open our file by clicking 'Add folder to Workspace' on the top left.
// We can open console alongwith Sources by clicking esc key.
// As we close the developer tools window, there will bbe no remote target available on the inspect page. If we want to run it again, we run the command 'restart' from the terminal.
// To shut down the inspector, we have to press Ctrl+c twice on the terminal.

// SHOW: module.exports = getNotes;
