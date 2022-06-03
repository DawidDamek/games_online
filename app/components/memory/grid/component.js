import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class MemoryGridComponent extends Component {
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
  ];

  shuffledCards = this.cardArray.sort(() => 0.5 - Math.random());

  @action
  flipCard(event) {
    console.log(event.target.alt);
  }
}
