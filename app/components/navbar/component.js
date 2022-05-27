import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class NavbarComponent extends Component {
  @service store;
  @service session;

  get loggedUser() {
    return this.session.currentUser;
  }

  @action
  onLogout() {
    this.session.logoutUser();
  }
}
