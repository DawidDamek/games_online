import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class UserGameHistorySortSwitcherComponent extends Component {
  @tracked sortDate;
  @tracked sortPoints;
  @tracked sortGame;

  get sortedGameHistory() {
    const {
      sortDate,
      sortPoints,
      sortGame,
      args: { model },
    } = this;

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
      return this.args.model.gameHistory.sortBy(sortedBy);
    }
    if (sortParam === 'DESC') {
      return this.args.model.gameHistory.sortBy(sortedBy).reverse();
    }
  }
}
