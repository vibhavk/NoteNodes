const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

var titleOptions = {
    describe: 'Title of the note',
    demand: true,
    alias: 't'
}

var bodyOptons = {
    describe: 'Body of the note',
    demand: true,
    alias: 'b'
}

const argv = yargs
    .command('add','Adds new notes', {
        title:titleOptions,
        body:bodyOptons
    })
    .command('list','Lists all the notes')
    .command('read','Reads the requested note', {
        title:titleOptions
    })
    .command('remove','Removes the node with title mentioned in the argument',{
        title:titleOptions
    })
    .help()
    .argv;


var command = argv._[0];
console.log('Command: ',command);

if(command === 'add'){
    var note = notes.addNote(argv.title, argv.body);
    if(note){
        console.log('Note created');
        notes.logNote(note);
    } else {
        console.log('Note title taken!');
    }
} else if(command === 'list'){
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s) :-> `);
    allNotes.forEach((note) => {
        notes.logNote(note);
    });
} else if(command === 'read'){
    var targetNote = notes.getNote(argv.title);
    if(targetNote){
        notes.logNote(targetNote);    
    } else {
        console.log('Note not found');
    }
} else if(command === 'remove'){
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note removed' : 'Note not found';
    console.log(message);
} else{
    console.log('Command not recognized');
}
