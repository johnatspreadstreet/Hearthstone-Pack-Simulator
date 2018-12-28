/* global $ display store api */
'use strict';

const initialCards = [
  'https://wow.zamimg.com/images/hearthstone/backs/animated/Card_Back_Default.gif',
  'https://wow.zamimg.com/images/hearthstone/backs/animated/Card_Back_Default.gif',
  'https://wow.zamimg.com/images/hearthstone/backs/animated/Card_Back_Default.gif',
  'https://wow.zamimg.com/images/hearthstone/backs/animated/Card_Back_Default.gif',
  'https://wow.zamimg.com/images/hearthstone/backs/animated/Card_Back_Default.gif',
];

$(function() {
  display.bindEventListeners();

  api.hasImg('Whispers of the Old Gods')
    .then(response => {
      store.cardsWithImg = response;
      display.render();
    });

  api.sets()
    .then(response => {
      store.expansions = response;
      display.render();
    });


});