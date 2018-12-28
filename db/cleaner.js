'use strict';

const cards = require('./cards');

let cleanedCards = [];

const detect404 = function(card) {
  let http = new XMLHttpRequest();
  let imgUrl = card.img;
  http.open('HEAD', imgUrl, false);
  http.send();
  if (http.status != 404) {
    cleanedCards.push(card);
  }
};

function cleaner(data) {
  for (let expansions in data) {
    let cards = data[expansions];
    cards.filter(card => detect404(card));
  }
}

cleaner(cards);
console.log(cleanedCards);