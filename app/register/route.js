import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class RegisterRoute extends Route {
  @service store;
  @service router;
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
