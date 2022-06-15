import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { later } from '@ember/runloop';

export default class MemoryGridComponent extends Component {
  @tracked cardsChosenNames = [];
  @tracked cardsChosenIds = [];
  @tracked cardsTemplateElement = [];
  @tracked clickedShuffledCards = [];
  @tracked result = 0;
  @tracked flipCount = 0;

  cardArray = [
    {
      name: 'fries',
      img: '/assets/images/fries.png',
      cardId: 1,
      isMatched: false,
    },
    {
      name: 'cheeseburger',
      img: '/assets/images/cheeseburger.png',
      cardId: 2,
      isMatched: false,
    },
    {
      name: 'hotdog',
      img: '/assets/images/hotdog.png',
      cardId: 3,
      isMatched: false,
    },
    {
      name: 'icecream',
      img: '/assets/images/ice-cream.png',
      cardId: 4,
      isMatched: false,
    },
    {
      name: 'milkshake',
      img: '/assets/images/milkshake.png',
      cardId: 5,
      isMatched: false,
    },
    {
      name: 'pizza',
      img: '/assets/images/pizza.png',
      cardId: 6,
      isMatched: false,
    },
    {
      name: 'fries',
      img: '/assets/images/fries.png',
      cardId: 7,
      isMatched: false,
    },
    {
      name: 'cheeseburger',
      img: '/assets/images/cheeseburger.png',
      cardId: 8,
      isMatched: false,
    },
    {
      name: 'hotdog',
      img: '/assets/images/hotdog.png',
      cardId: 9,
      isMatched: false,
    },
    {
      name: 'icecream',
      img: '/assets/images/ice-cream.png',
      cardId: 10,
      isMatched: false,
    },
    {
      name: 'milkshake',
      img: '/assets/images/milkshake.png',
      cardId: 11,
      isMatched: false,
    },
    {
      name: 'pizza',
      img: '/assets/images/pizza.png',
      cardId: 12,
      isMatched: false,
    },
  ];

  shuffledCards = this.cardArray.sort(() => 0.5 - Math.random());

  @action
  flipCard(event) {
    const clickedCard = this.shuffledCards.find((card) => {
      return card.cardId === parseInt(event.target.getAttribute('data-id'));
    });

    if (this.flipCount === 2 || clickedCard.isMatched) {
      return;
    }

    this.cardsChosenIds.push(event.target.getAttribute('data-id'));
    this.cardsTemplateElement.push(event.target);
    this.clickedShuffledCards.unshift(clickedCard);
    event.target.setAttribute('src', [clickedCard.img]);
    this.cardsChosenNames.push(clickedCard.name);
    this.flipCount = this.flipCount + 1;

    if (this.cardsTemplateElement.length == 2) {
      later(
        this,
        () => {
          this.checkMatch(event);
        },
        500
      );
    }
  }

  checkMatch(event) {
    const card = event.target;
    const optionOneId = this.cardsChosenIds[0];
    const optionTwoId = this.cardsChosenIds[1];

    if (optionOneId == optionTwoId) {
      alert('you have clicked the same image!');
      card.setAttribute('src', '/assets/images/blank.png');
    } else {
      if (this.cardsChosenNames[0] == this.cardsChosenNames[1]) {
        this.result = this.result + 1;
        this.clickedShuffledCards[0].isMatched = true;
        this.clickedShuffledCards[1].isMatched = true;
      } else {
        this.cardsTemplateElement[0].setAttribute(
          'src',
          '/assets/images/blank.png'
        );
        this.cardsTemplateElement[1].setAttribute(
          'src',
          '/assets/images/blank.png'
        );
      }
      this.flipCount = 0;
      this.cardsChosenNames = [];
      this.cardsChosenIds = [];
      this.cardsTemplateElement = [];
    }
  }
}
