import Route from '@ember/routing/route';
import { storageFor } from 'ember-local-storage';
import { inject as service } from '@ember/service';

export default class LoginRoute extends Route {
  @storageFor('logged-as') loggedAs;
  @service router;
  @service store;

  beforeModel() {
    const userId = this.loggedAs.get('id');
    if (userId) {
      this.router.transitionTo('home');
      return;
    }
  }
}
