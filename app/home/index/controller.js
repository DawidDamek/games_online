import Controller from '@ember/controller';
export default class IndexController extends Controller {
  get topMemoryPlay() {
    return this.model
      .filter(({ gameName }) => gameName === 'Memory')
      .sortBy('points')
      .reverse().firstObject;
  }

  get topWhacAMolePlay() {
    return this.model
      .filter(({ gameName }) => gameName === 'Whac a Mole')
      .sortBy('points')
      .reverse().firstObject;
  }
}
