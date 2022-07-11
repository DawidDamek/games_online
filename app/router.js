import EmberRouter from '@ember/routing/router';
import config from 'games-online/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('home', { path: '/' }, function () {
    this.route('games');
    this.route('users');
    this.route('memory');
    this.route('whacamole');
    this.route('tictactoe');

    this.route('game', function () {
      this.route('show');
    });

    this.route('user', function () {
      this.route('show', { path: '/:id' });
    });
    this.route('user-settings', { path: '/profile' });
  });
  this.route('register');
  this.route('login');
});
