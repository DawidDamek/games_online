import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class UsersController extends Controller {
  @tracked sortMemory;
  @tracked sortWhacamole;

  queryParams = ['sortMemory', 'sortWhacamole'];

  get users() {
    return this.model;
  }

  get sortedUsers() {
    const { sortMemory, sortWhacamole, users } = this;
    if (sortMemory || sortWhacamole) {
      const queryParam = sortMemory || sortWhacamole;
      const sortedColumn = sortMemory ? 'memoryTopScore' : 'whacamoleTopScore';
      return this.#sortUsers(queryParam, sortedColumn);
    }

    return users;
  }

  @action
  onSortToggleMemory() {
    this.sortWhacamole = undefined;
    this.sortMemory = this.#sortDirectionResolver(this.sortMemory);
  }

  @action
  onSortToggleWhac() {
    this.sortMemory = undefined;
    this.sortWhacamole = this.#sortDirectionResolver(this.sortWhacamole);
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
      return this.users.sortBy(sortedColumn);
    }
    if (queryParam === 'DESC') {
      return this.users.sortBy(sortedColumn).reverse();
    }
  }
}
