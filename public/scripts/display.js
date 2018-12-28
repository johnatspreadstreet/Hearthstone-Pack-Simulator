/* global $ store api */

'use strict';

const display = function() {
  function template(src, num) {
    return `
        <img id=${num} class="js-card-back" data-src="${src}" alt="" uk-img>
        `;
  }

  function generateExpansionsString(sets) {
    const expansionList = sets.map((expansion, index) => `<li class="js-expansion"><a href="#">${expansion}</a></li>`);
    return expansionList.join('');
  }

  function generateCardsView(cards) {
    const cardsList = cards.map((card, index) => template(card, index));
    return cardsList.join('');
  }

  function render() {
    const cardList = generateCardsView(store.cards);
    const expansions = generateExpansionsString(store.expansions);

    $('.js-cards-list').html(cardList);
    $('.js-expansions-nav').html(expansions);
  }

  function handleCardClick() {
    $('.js-cards-list').on('click', '.js-card-back', function(e) {
      e.preventDefault();
      const id = e.target.id;
      const randomCard = store.randomCard();
      const {img} = randomCard;
      store.detect404(img, img, id);
      render();
    });
  }

  function handleExpansionClick() {
    $('.js-expansions-nav').on('click', '.js-expansion', function(e) {
      e.preventDefault();
      const expansion = $(e.target).text();
      store.currentExpansion = expansion;
      api.hasImg(expansion)
        .then(function(res) {
          store.cardsWithImg = res;
          render();
        });
    });
  }
    
  function bindEventListeners() {
    handleCardClick();
    handleExpansionClick();
  }

  return {
    bindEventListeners,
    render
  };
}();