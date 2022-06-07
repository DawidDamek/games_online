import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class MemoryGridComponent extends Component {
  @tracked cardsChosen = [];
  @tracked cardsChosenIds = [];
  @tracked cardsWon = [];
  @tracked result;

  cardArray = [
    {
      name: 'fries',
      img: '/assets/images/fries.png',
      cardId: 1,
    },
    {
      name: 'cheeseburger',
      img: '/assets/images/cheeseburger.png',
      cardId: 2,
    },
    {
      name: 'hotdog',
      img: '/assets/images/hotdog.png',
      cardId: 3,
    },
    {
      name: 'icecream',
      img: '/assets/images/ice-cream.png',
      cardId: 4,
    },
    {
      name: 'milkshake',
      img: '/assets/images/milkshake.png',
      cardId: 5,
    },
    {
      name: 'pizza',
      img: '/assets/images/pizza.png',
      cardId: 6,
    },
    {
      name: 'fries',
      img: '/assets/images/fries.png',
      cardId: 7,
    },
    {
      name: 'cheeseburger',
      img: '/assets/images/cheeseburger.png',
      cardId: 8,
    },
    {
      name: 'hotdog',
      img: '/assets/images/hotdog.png',
      cardId: 9,
    },
    {
      name: 'icecream',
      img: '/assets/images/ice-cream.png',
      cardId: 10,
    },
    {
      name: 'milkshake',
      img: '/assets/images/milkshake.png',
      cardId: 11,
    },
    {
      name: 'pizza',
      img: '/assets/images/pizza.png',
      cardId: 12,
    },
  ];

  shuffledCards = this.cardArray.sort(() => 0.5 - Math.random());

  @action
  flipCard(event) {
    const clickedCard = this.shuffledCards.find((card) => {
      return card.cardId === parseInt(event.target.getAttribute('data-id'));
    });
    this.cardsChosenIds.push(clickedCard.cardId);
    this.cardsChosen.push(clickedCard.name);
    event.target.setAttribute('src', [clickedCard.img]);
    // here add this.checkMatch()
  }
}
