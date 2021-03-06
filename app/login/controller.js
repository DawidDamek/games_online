import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

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

  clearFields() {
    const fieldIds = ['staticLogin', 'inputPassword'];
    fieldIds.map((fieldId) => {
      const fieldElement = document.querySelector(`#${fieldId}`);
      fieldElement.value = '';
    });
  }
}
