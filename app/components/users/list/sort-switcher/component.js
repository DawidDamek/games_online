import Component from '@glimmer/component';

export default class UserListSortSwitcherComponent extends Component {
  get sortLabel() {
    const { sortParam } = this.args;
    return sortParam ? (sortParam === 'ASC' ? '↓' : '↑') : '';
  }
}
