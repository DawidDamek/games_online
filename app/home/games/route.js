import Route from '@ember/routing/route';

export default class GamesRoute extends Route {
  model() {
    const games = [
      {
        id: 1,
        title: 'Memory game',
        picture: 'assets/images/memory.png',
        description: 'Match the cards into pairs',
        link: 'home.memory',
      },
      {
        id: 2,
        title: 'Whac a mole',
        picture: 'assets/images/whacamole.png',
        description: 'Whack a mole as many times as You can',
        link: 'home.whacamole',
      },
      {
        id: 3,
        title: 'Tic-Tac-Toe',
        picture: 'assets/images/TicTacToe.png',
        description: 'MULTIPLAYER TicTacToe',
        link: 'home.tictactoe',
      },
    ];
    return games;
  }
}
