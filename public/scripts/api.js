// Remember to make functions self-invoking
/* global $ */

'use strict';

const api = {

  cardDetails: function(id) {
    return $.ajax({
      type: 'GET',
      url: `/api/cards/${id}`,
      dataType: 'json',
    });
  },

  sets: function() {
    return $.ajax({
      type: 'GET',
      url: '/api/meta/sets',
      dataType: 'json',
    });
  },

  hasImg: function(query) {
    return $.ajax({
      type: 'GET',
      url: `/api/cards?searchTerm=${query}`,
      dataType: 'json',
    });
  },

  random: function() {
    // return $.ajax({
    // //   type: 'GET',
    // //   dataType: 'json',
    // //   url: '/api/cards/random'
    // // });
    let cards = store.cardsWithImg;
    let cardLength = cards.length;
    let randomCard = cards[Math.floor(Math.random()*cardLength)];
    return randomCard;
  },

  img: function(url) {
    return $.ajax({
      type: 'GET',
      url: url,
    });
  },

  detect404: function(url) {
    let http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    if (http.status != 404) {
        
    } else {
      window.location.reload();
    }
  }
};