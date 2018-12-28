'use strict';

const express = require('express');
const cardsRouter = express.Router();

const allCards = require('../db/cards');
const meta = require('../db/meta');
const filteredCards = require('../db/filteredCards');
let expansions = 'Whispers of the Old Gods';
let data = allCards[expansions]; // array of objects
const api = require('../db/hearthstone');
let cards = api.initialize(data);

cardsRouter.get('/cards', (req, res, next) => {
  const {searchTerm} = req.query;
  expansions = searchTerm;
  data = allCards[expansions]; // array of objects
  cards = api.initialize(data);

  cards.filterWithImg(searchTerm)
    .then(filteredCards => {
      return res.json(filteredCards);
    })
    .catch(err => {
      return next(err);
    });
});

cardsRouter.get('/cards/random', (req, res, next) => {

  cards.random(filteredCards)
    .then(item => {
      console.log(item);
      res.json(item);
    })
    .catch(err => {
      console.log(err.message);
      next(err);
    });
});

cardsRouter.get('/meta/:type', (req, res, next) => {
  const {type} = req.params;
  const newData = meta[type];

  res.json(newData);
});

module.exports = cardsRouter;