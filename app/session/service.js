import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { storageFor } from 'ember-local-storage';
import { tracked } from '@glimmer/tracking';

export default class SessionService extends Service {
  @storageFor('logged-as') loggedAs;
  @service store;
  @tracked currentUser;

  get isLoggedIn() {
    return this.loggedAs.get('id');
  }

  async loginUser(id) {
    this.loggedAs.set('id', id);
    await this.setCurrentUser();
  }

  logoutUser() {
    this.loggedAs.set('id', null);
    window.location.href = '/login';
  }

  async setCurrentUser() {
    const userId = this.loggedAs.get('id');
    const user = await this.store.findRecord('user', userId);
    this.currentUser = user;
  }
}
