import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { cloneDeep, random } from 'lodash';

export default class TicTacToeComponent extends Component {
  @tracked blocks = Array.from({ length: 9 }, (_, id) => ({
    symbol: null,
    id,
  }));
  @tracked nextMove = '𝗫';
  @tracked isStarted = false;
  @tracked winner = null;
  @tracked isSingleplayer = true;
  @tracked computerPossibleBlocks = [];

  matrix = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  get shouldBeDisabled() {
    return Boolean(this.isStarted);
  }

  get gameMode() {
    return this.isSingleplayer ? 'Singleplayer' : 'Multiplayer';
  }

  get shouldBeAbleToClick() {
    return Boolean(!this.winner);
  }

  get nobodyWin() {
    return Boolean(this.blocks.find(({ id }) => id !== null));
  }

  @action
  onChangeGameMode() {
    this.isSingleplayer = !this.isSingleplayer;
  }

  @action
  onClick(event) {
    const { target } = event.target;
    if (this.isSingleplayer) {
      if (this.shouldBeAbleToClick) {
        const newGrid = this.blocks;
        let blockState = newGrid.find(({ id }) => id === JSON.parse(target.id));
        if (blockState.symbol !== null) {
          return;
        }
        blockState.symbol = this.nextMove;
        this.blocks = cloneDeep(newGrid);
        this.computerClick();
        this.checkWinner();
      }
    }
    if (this.shouldBeAbleToClick) {
      const newGrid = this.blocks;
      let blockState = newGrid.find(({ id }) => id === JSON.parse(target.id));
      if (blockState.symbol !== null) {
        return;
      }
      blockState.symbol = this.nextMove;
      this.blocks = cloneDeep(newGrid);

      if (this.nextMove === '𝗫') {
        this.nextMove = 'O';
      } else {
        this.nextMove = '𝗫';
      }
      this.checkWinner();
    }
    return;
  }

  @action
  onStart() {
    this.isStarted = true;
  }

  @action
  onReset() {
    this.isStarted = false;
    this.blocks = Array.from({ length: 9 }, (_, id) => ({
      symbol: null,
      id,
    }));
    this.winner = null;
  }

  checkWinner() {
    let boardLine = this.matrix.map((line) => {
      return line.map((index) => this.blocks[index].symbol);
    });
    boardLine.forEach((line) => {
      if (line.every((value) => value === '𝗫')) {
        this.winner = '𝗫';
      }

      if (line.every((value) => value === 'O')) {
        this.winner = 'O';
      }
    });
    if (this.blocks.every(({ symbol }) => symbol !== null)) {
      this.winner = 'Nobody';
    }
  }

  computerClick() {
    if (this.blocks.every(({ symbol }) => symbol !== null)) {
      return;
    }
    this.computerPossibleBlocks = this.blocks.filter(
      ({ symbol }) => symbol === null
    );
    this.computerPossibleBlocks[
      random(0, this.computerPossibleBlocks.length - 1)
    ].symbol = 'O';
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this.blocks = Array.from({ length: 9 }, (_, id) => ({
      symbol: null,
      id,
    }));
    this.winner = null;
    this.isStarted = false;
  }
}
