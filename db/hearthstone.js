'use strict';

const axios = require('axios');
const fs = require('fs');
// const allCards = require('./cards.json');

const BASE_URL = 'https://omgvamp-hearthstone-v1.p.mashape.com';
const MASHAPE_KEY = 'dMHkSEuoDrmshZxFIPf47djFFMJJp1EbTC7jsnzkaUs8ALPf4R';
const data = { 
  headers: {'X-Mashape-Key': MASHAPE_KEY},
};
const { promisify } = require('util');

const api = {
  initialize: function(data) {
    this.data = data.map(item => {
      return item;
    });
    return this;
  },

  find: function(id, callback) {
    try {
      // id = Number(id);
      let item = this.data.find(item => item.cardId === id);
      callback(null, item);
    } catch (err) {
      callback(err);
    }
  },

  filterWithImg: function(datum, callback) {
    try {
      let data = this.data.filter(item => (item.img) ? item : '');
      callback(null, data);
    } catch (err) {
      callback(err);
    }
  },

  random: function(term, callback) {
    try {
      let cards = this.data;
      let cardLength = cards.length;
      let randomCard = cards[Math.floor(Math.random()*cardLength)];
      callback(null, randomCard);
    } catch (err) {
      callback(err);
    }
  },

  filter: function(endpoint, callback) {
    try {
      let data = this.filter(info => info.endpoint);
      callback(null, data);
    } catch (err) {
      callback(err);
    }
  },
  

  hasImage: function(card) {
    return (card.img) ? card : '';
  },



  getAllCards: function(cards) {
    return axios.get(`${BASE_URL}${cards}`, data);
  },

  getAllExpansions: function(data) {
    const expansions = [];
    return expansions.push(Object.keys(data));
  },

  getCardBacks: function(cardBacks) {
    return axios.get(`${BASE_URL}${cardBacks}`, data);
  },

  getMetaInfo: function(info) {
    return axios.get(`${BASE_URL}${info}`, data);
  },

  writeToFile: function(fileName, data) {
    return fs.writeFile(fileName, data, (err) => {
      if (err) throw err;
      console.log('Hearthstone file has been saved!');
    });
  }
};

module.exports = Object.create({
  initialize: api.initialize,
  // create: promisify(api.create),
  filter: promisify(api.filter),
  find: promisify(api.find),
  random: promisify(api.random),
  filterWithImg: promisify(api.filterWithImg),
  writeToFile: promisify(api.writeToFile),
  // update: promisify(api.update),
  // delete: promisify(api.delete)
});

// Will download all cards from the Hearthstone API and save to file
// api.getAllCards(data)
//   .then(function(response) {
//     let {data} = response;
//     return JSON.stringify(data);
//   })
//   .then(function(string) {
//     return api.writeToFile(string);
//   })
//   .catch(function(err) {
//     console.log(err.message);
//   });

// api.getMetaInfo('/info')
//   .then(function(res) {
//     const {data} = res;
//     return JSON.stringify(data);
//   })
//   .then(function(res) {
//     return api.writeToFile('./meta.json', res);
//   })
//   .catch(function(err) {
//     console.log(err.message);
//   });