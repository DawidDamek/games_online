import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class SettingsRoute extends Route {
  @service session;

  checker = true;

  async model() {
    return this.session.currentUser;
  }
}
