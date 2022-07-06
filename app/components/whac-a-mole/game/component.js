import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { cloneDeep } from 'lodash';
import Timer from 'ember-stopwatch/utils/timer';
import { inject as service } from '@ember/service';

export default class WhacAMoleComponent extends Component {
  @service session;

  @tracked randomSquare;
  @tracked startMoving = null;
  @tracked score = 0;
  @tracked isPaused = false;
  @tracked isStarted = false;
  @tracked difficult = 1;
  @tracked speed = 800;
  @tracked finalScore;
  @tracked shouldBeAbleToChangeDifficulty = false;

  @tracked squares = [
    { isShow: false, id: 1 },
    { isShow: false, id: 2 },
    { isShow: false, id: 3 },
    { isShow: false, id: 4 },
    { isShow: false, id: 5 },
    { isShow: false, id: 6 },
    { isShow: false, id: 7 },
    { isShow: false, id: 8 },
    { isShow: false, id: 9 },
  ];

  timer = new Timer(30000);

  get timeInSeconds() {
    return (this.timer.remainingMillis / 1000).toFixed(2);
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
    this.score++;
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
    this.timer.reset();
    let blankSquares = this.squares.map((square) => {
      square.isShow = false;
      return square;
    });
    this.squares = cloneDeep(blankSquares);
    this.shouldBeAbleToChangeDifficulty = false;
  }

  finishedGame() {
    this.stopMole();
    this.finalScore = this.score * this.difficult;
    if (this.session.currentUser.whacamoleTopScore < this.finalScore) {
      this.session.currentUser.whacamoleTopScore = this.finalScore;
      this.saveUser();
    }
    alert(`Your final score is ${this.finalScore}`);
    let blankSquares = this.squares.map((square) => {
      square.isShow = false;
      return square;
    });
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
  }

  async saveUser() {
    await this.session.currentUser.save();
  }
}
