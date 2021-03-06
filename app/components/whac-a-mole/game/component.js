import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { cloneDeep } from 'lodash';
import Timer from 'ember-stopwatch/utils/timer';
import { inject as service } from '@ember/service';

export default class WhacAMoleComponent extends Component {
  @service session;
  @service store;
  @tracked randomSquare;
  @tracked startMoving = null;
  @tracked score = 0;
  @tracked isPaused = false;
  @tracked isStarted = false;
  @tracked difficult = 1;
  @tracked speed = 800;
  @tracked finalScore = 0;
  @tracked shouldBeAbleToChangeDifficulty = false;
  @tracked wasClicked = false;
  @tracked isShowSharedModal = false;
  @tracked squares = Array.from({ length: 9 }, (_, id) => ({
    isShow: false,
    id,
  }));

  time = 30000;

  constructor() {
    super(...arguments);

    this.timer = new Timer(this.time);
  }

  get timeInSeconds() {
    return (this.timer.remainingMillis / 1000).toFixed(1);
  }

  @action
  onHideModal() {
    this.isShowSharedModal = false;
    this.onReset();
  }

  @action
  moveMole() {
    this.isStarted = true;
    this.isPaused = false;
    this.shouldBeAbleToChangeDifficulty = true;
    this.timer.start();
    this.startMoving = setInterval(() => {
      this.generateRandomSquare();
    }, this.speed);
    this.timer.on('expired', this, this.finishedGame);
  }

  @action
  stopMole() {
    this.timer.stop();
    clearInterval(this.startMoving);
    this.isStarted = false;
    this.isPaused = true;
  }

  @action
  addPoint() {
    if (this.isPaused) {
      return;
    }
    if (!this.wasClicked) {
      this.score++;
      this.wasClicked = true;
    }
  }

  @action
  onHard() {
    this.difficult = 5;
    this.speed = 400;
  }

  @action
  onMedium() {
    this.difficult = 1.5;
    this.speed = 600;
  }

  @action
  onEasy() {
    this.difficult = 1;
    this.speed = 800;
  }

  @action
  onReset() {
    this.stopMole();
    this.timer.reset();
    let blankSquares = this.squares.map((square) => {
      square.isShow = false;
      return square;
    });
    this.squares = cloneDeep(blankSquares);
    this.shouldBeAbleToChangeDifficulty = false;
    this.score = 0;
    this.finalScore = 0;
  }

  finishedGame() {
    this.stopMole();
    this.finalScore = this.score * this.difficult;
    if (this.session.currentUser.whacamoleTopScore < this.finalScore) {
      this.session.currentUser.whacamoleTopScore = this.finalScore;
      this.saveUser();
    }
    let blankSquares = this.squares.map((square) => {
      square.isShow = false;
      return square;
    });
    this.saveGameHistory();
    this.isShowSharedModal = true;
    this.squares = cloneDeep(blankSquares);
    this.score = 0;
  }

  generateRandomSquare() {
    let blankSquares = this.squares.map((square) => {
      square.isShow = false;
      return square;
    });
    this.squares = cloneDeep(blankSquares);
    this.randomSquare = this.squares[Math.floor(Math.random() * 9)];
    this.randomSquare.isShow = true;
    this.wasClicked = false;
  }

  async saveUser() {
    await this.session.currentUser.save();
  }

  async saveGameHistory() {
    const game = {
      gameName: 'Whac a Mole',
      date: new Date(),
      points: this.finalScore,
      player: this.session.currentUser,
    };
    const gameHistoryModel = this.store.createRecord('gameHistory', game);
    await gameHistoryModel.save();
  }

  willDestroy() {
    super.willDestroy(...arguments);
    clearInterval(this.startMoving);
    this.timer.reset();
  }
}
