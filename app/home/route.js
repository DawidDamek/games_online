import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class HomeRoute extends Route {
  @service router;
  @service session;
  @service abilities;

  async beforeModel() {
    const { isLoggedIn } = this.session;
    if (!isLoggedIn) {
      this.router.transitionTo('/login');
      return;
    }
    //  if (this.abilities.cannot('visit page')) {
    //    this.router.transitionTo('/login');
    //    return;
    //  }
    await this.session.setCurrentUser();
  }
}
