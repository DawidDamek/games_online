import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class UserListComponent extends Component {
  @service router;

  get users() {
    return this.model;
  }

  get sortedUsers() {
    const { sortMemory, sortWhacamole, users } = this.args;
    if (sortMemory || sortWhacamole) {
      const queryParam = sortMemory || sortWhacamole;
      const sortedColumn = sortMemory ? 'memoryTopScore' : 'whacamoleTopScore';
      return this.#sortUsers(queryParam, sortedColumn);
    }
    return users;
  }

  @action
  onSortToggleMemory() {
    const sortWhacamole = null;
    const sortMemory = this.#sortDirectionResolver(this.args.sortMemory);
    this.router.transitionTo({ queryParams: { sortWhacamole, sortMemory } });
  }

  @action
  onSortToggleWhac() {
    const sortMemory = null;
    const sortWhacamole = this.#sortDirectionResolver(this.args.sortWhacamole);
    this.router.transitionTo({ queryParams: { sortWhacamole, sortMemory } });
  }

  #sortDirectionResolver(param) {
    if (!param) {
      return (param = 'ASC');
    }
    if (param === 'ASC') {
      return (param = 'DESC');
    }
    return (param = undefined);
  }

  #sortUsers(queryParam, sortedColumn) {
    if (queryParam === 'ASC') {
      return this.args.users.sortBy(sortedColumn);
    }
    if (queryParam === 'DESC') {
      return this.args.users.sortBy(sortedColumn).reverse();
    }
  }
}
