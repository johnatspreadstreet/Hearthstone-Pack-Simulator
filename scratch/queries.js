'use strict';

const allCards = require('../db/cards');
const filteredCards = require('../db/filteredCards');
const data = allCards['Basic']; // array of objects
const api = require('../db/hearthstone');
const cards = api.initialize(data);
const fs = require('fs');

function writeToFile(fileName, data) {
  return fs.writeFile(fileName, data, (err) => {
    if (err) throw err;
    console.log('Hearthstone file has been saved!');
  });
}

// cards.find('GAME_004')
//   .then(item => {
//     if (item) {
//       console.log(item);
//     }
//   })
//   .catch(err => console.log(err.message, 'did not work'));

cards.random(filteredCards)
  .then(item => {
    console.log(item);
  })
  .catch(err => {
    console.log(err.message);
  });

// cards.filterWithImg(data)
//   .then(filteredCards => {
//     return JSON.stringify(filteredCards);
//   })
//   .then(function(string) {
//     return writeToFile('./filteredCards.json', string);
//   });