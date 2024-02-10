var vscode = require('vscode');
const fs = require('fs');
const path = require('path'); // Import the 'path' module

const extFuncs = require('./files/funcs.js');

//path
var extId = 'learnwithyan.lipsumtext';
//path of ext
var extensionPath = vscode.extensions.getExtension(extId).extensionPath;

function activate(context) {
  context.subscriptions.push(
    vscode.commands.registerCommand('lipsumtext.com1', function () {
      extFuncs.trnslReadmeHandler();
    }),
    vscode.commands.registerCommand('lipsumtext.com2', function () {
      genTextParagrahs(3);
    }),
    vscode.commands.registerCommand('lipsumtext.com3', function () {
      genTextParagrahs(6);
    }),
    vscode.commands.registerCommand('lipsumtext.com4', function () {
      genTextParagrahs(9);
    }),
    vscode.commands.registerCommand('lipsumtext.com5', function () {
      genTextParagrahs(12);
    }),
    vscode.commands.registerCommand('lipsumtext.com6', function () {
      genTextParagrahs(15);
    })
  );
}
exports.activate = activate;

function deactivate() {}
exports.deactivate = deactivate;

// function helpers
function genTextParagrahs(numberOfItems) {
  var editor = vscode.window.activeTextEditor;
  if (!editor) {
    return;
  }

  var selection = editor.selection;
  var text = editor.document.getText(selection);

  var content = extFuncs.readFile(
    path.join(extensionPath, '/files/lipsumbase.txt')
  );
  var paragraphs = content.split(/\n\s*\n/);

  paragraphs = paragraphs.map((paragraph) => paragraph.trim());
  paragraphs = shuffleArray(paragraphs);

  if (typeof paragraphs !== 'undefined' && paragraphs.length > 0) {
    const textString = paragraphs
      .slice(0, numberOfItems)
      .map((obj) => obj)
      .join('\n');
    editor.edit(function (editBuilder) {
      editBuilder.replace(selection, textString);
    });

    extFuncs.infoMsg(vscode, numberOfItems + ' generated');
  } else {
    extFuncs.warnMsg(vscode, "Paragrpahs weren't generated");
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
