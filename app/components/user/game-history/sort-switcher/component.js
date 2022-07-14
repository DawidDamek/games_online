import Component from '@glimmer/component';

export default class UserGameHistorySortSwitcherComponent extends Component {
  get sortLabel() {
    const { sortParam } = this.args;
    return sortParam ? (sortParam === 'ASC' ? '↓' : '↑') : '';
  }
}
