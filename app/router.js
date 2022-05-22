import EmberRouter from '@ember/routing/router';
import config from 'games-online/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('games');
  this.route('users');
  this.route('settings');
  this.route('memory');

  this.route('game', function () {
    this.route('show');
  });
  this.route('whacamole');

  this.route('user', function () {
    this.route('show');
  });
});
