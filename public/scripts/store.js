'use strict';

const store = function() {
  const cards = [
    'https://wow.zamimg.com/images/hearthstone/backs/animated/Card_Back_Default.gif',
    'https://wow.zamimg.com/images/hearthstone/backs/animated/Card_Back_Default.gif',
    'https://wow.zamimg.com/images/hearthstone/backs/animated/Card_Back_Default.gif',
    'https://wow.zamimg.com/images/hearthstone/backs/animated/Card_Back_Default.gif',
    'https://wow.zamimg.com/images/hearthstone/backs/animated/Card_Back_Default.gif',
  ];

  const randomCard = function() {
    let cards = this.cardsWithImg;
    let cardLength = cards.length;
    let randomCard = cards[Math.floor(Math.random()*cardLength)];
    return randomCard;
  };

  const detect404 = function(url, img, id) {
    let http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    if (http.status != 404) {
      store.cards[id] = img;
    } else {
      window.location.reload();
    }
  };
  
  return {
    cards,
    cardsWithImg: [],
    expansions: [],
    randomCard,
    currentExpansion: 'The Grand Tournament',
    detect404,
  };
}();