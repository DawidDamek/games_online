import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class UsersShowController extends Controller {
  @tracked sortDate;
  @tracked sortPoints;
  @tracked sortGame;

  get sortedGameHistory() {
    const { sortDate, sortPoints, sortGame, model } = this;

    if (sortDate || sortPoints || sortGame) {
      const sortParam = sortDate || sortPoints || sortGame;
      const sortedBy = sortDate ? 'date' : sortPoints ? 'points' : 'gameName';
      return this.sortGameHistory(sortParam, sortedBy);
    }

    return model.gameHistory;
  }

  @action
  onSortDate() {
    this.sortPoints = null;
    this.sortGame = null;
    this.sortDate = this.sortDirectionResolver(this.sortDate);
  }

  @action
  onSortPoints() {
    this.sortGame = null;
    this.sortDate = null;
    this.sortPoints = this.sortDirectionResolver(this.sortPoints);
  }

  @action
  onSortGame() {
    this.sortPoints = null;
    this.sortDate = null;
    this.sortGame = this.sortDirectionResolver(this.sortGame);
  }

  sortDirectionResolver(param) {
    if (!param) {
      return (param = 'ASC');
    }
    if (param === 'ASC') {
      return (param = 'DESC');
    }
    return (param = undefined);
  }

  sortGameHistory(sortParam, sortedBy) {
    if (sortParam === 'ASC') {
      return this.model.gameHistory.sortBy(sortedBy);
    }
    if (sortParam === 'DESC') {
      return this.model.gameHistory.sortBy(sortedBy).reverse();
    }
  }
}
