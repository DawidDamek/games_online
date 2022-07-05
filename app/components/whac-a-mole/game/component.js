import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class WhacAMoleComponent extends Component {
  @tracked mole;
  @tracked squares = document.querySelectorAll('.square');
  @tracked mole = document.querySelector('.mole');
}
