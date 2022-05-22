import Route from '@ember/routing/route';

export default class GamesRoute extends Route {
  model() {
    const games = [
      {
        id: 1,
        title: 'memory game',
        picture: 'assets/images/memory.png',
        description: 'match cards into pairs',
        link: 'home.memory',
      },
      {
        id: 2,
        title: 'whac a mole',
        picture: 'assets/images/whacamole.png',
        description: 'click a mole as many times as You can',
        link: 'home.whacamole',
      },
    ];
    return games;
  }
}
