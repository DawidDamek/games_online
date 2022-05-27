import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class LoginRoute extends Route {
  @service router;
  @service store;
  @service session;

  async beforeModel() {
    const { isLoggedIn } = this.session;
    if (isLoggedIn) {
      await this.session.setCurrentUser();
      this.router.transitionTo('home');
      return;
    }
  }
}
