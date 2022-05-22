import Component from '@glimmer/component';

export default class MemoryGameComponent extends Component {
  didInsertResult(element) {
    element.textContent = 'dupa2';
  }

  didInsertGrid(element) {
    for (let i = 0; i < 12; i++) {
      const card = document.createElement('img');
      card.setAttribute('src', 'assets/images/blank.png');
      card.setAttribute('data-id', i);
      element.append(card);
    }
  }
}
