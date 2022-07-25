import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import Auth0Lock from 'auth0-lock';
import ENV from 'games-online/config/environment';

export default class LoginController extends Controller {
  @service store;
  @service session;
  @tracked loginValue;
  @tracked passwordValue;
  @tracked userExist;
  @tracked isShowSharedModal = false;

  @action
  onHideModal() {
    this.isShowSharedModal = false;
    this.clearFields();
  }

  @action
  onLoginChange(event) {
    this.loginValue = event.target.value;
  }

  @action
  onPasswordChange(event) {
    this.passwordValue = event.target.value;
  }

  @action
  async onSubmit(event) {
    event.preventDefault();
    const users = await this.store.query('user', {
      filter: { username: this.loginValue, password: this.passwordValue },
    });
    this.userExist = Boolean(users.length);
    if (this.userExist) {
      const user = users.firstObject;
      this.session.loginUser(user.id);
      window.location.href = '/';
    } else {
      this.isShowSharedModal = true;
    }
  }

  @action
  onLoginOrRegisterAuth0() {
    const options = { auth: { redirect: false } };
    const lock = new Auth0Lock(ENV.AUTH0_CLIENT_ID, ENV.AUTH0_DOMAIN, options);
    lock.show({ allowedConnections: ['google-oauth2'] });

    lock.on('authenticated', (authResult) => {
      lock.getUserInfo(authResult.accessToken, async (error, profileResult) => {
        if (error) {
          console.log('error', error);
          return;
        }
        const profile = profileResult;

        await this.session.loginOrRegisterBy0auth(profile);
      });
    });
  }

  clearFields() {
    const fieldIds = ['staticLogin', 'inputPassword'];
    fieldIds.map((fieldId) => {
      const fieldElement = document.querySelector(`#${fieldId}`);
      fieldElement.value = '';
    });
  }
}
