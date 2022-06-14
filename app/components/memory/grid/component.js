import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { later, cancel } from '@ember/runloop';

export default class MemoryGridComponent extends Component {
  @tracked cardsChosenNames = [];
  @tracked cardsChosenIds = [];
  @tracked cardsTemplateElement = [];
  @tracked result = 0;
  @tracked flipCount = 0;

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
    if (this.flipCount === 2) {
      return;
    }

    const clickedCard = this.shuffledCards.find((card) => {
      return card.cardId === parseInt(event.target.getAttribute('data-id'));
    });
    this.cardsChosenIds.push(event.target.getAttribute('data-id'));
    this.cardsTemplateElement.push(event.target);
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
    console.log('check match');
    const card = event.target;
    const optionOneId = this.cardsChosenIds[0];
    const optionTwoId = this.cardsChosenIds[1];

    if (optionOneId == optionTwoId) {
      alert('you have clicked the same image!');
      card.setAttribute('src', '/assets/images/blank.png');
      console.log(this.flipCount);
    } else {
      if (this.cardsChosenNames[0] == this.cardsChosenNames[1]) {
        console.log('para');
        this.result = this.result + 1;
        console.log(this.flipCount);
      } else {
        console.log('nie para');
        this.cardsTemplateElement[0].setAttribute(
          'src',
          '/assets/images/blank.png'
        );
        this.cardsTemplateElement[1].setAttribute(
          'src',
          '/assets/images/blank.png'
        );
        console.log(this.flipCount);
      }
      this.flipCount = 0;
      this.cardsChosenNames = [];
      this.cardsChosenIds = [];
      this.cardsTemplateElement = [];
    }
  }
}
