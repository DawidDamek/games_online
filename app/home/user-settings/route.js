import Route from '@ember/routing/route';
import { storageFor } from 'ember-local-storage';
import { inject as service } from '@ember/service';

export default class SettingsRoute extends Route {
  @service store;
  @storageFor('logged-as') loggedAs;

  async model() {
    const user = await this.store.findRecord('user', this.loggedAs.get('id'));
    return user;
  }
}
