import Component from '@glimmer/component';
import { action } from '@ember/object';
import { Changeset } from 'ember-changeset';
import { tracked } from '@glimmer/tracking';

export default class EditUserComponent extends Component {
  @tracked isShowSharedModal = false;
  @tracked usernameChange = false;
  @tracked photoURLChange = false;
  @tracked emailChange = false;
  @tracked passwordChange = false;
  @tracked avatarChange = false;

  constructor() {
    super(...arguments);
    this.userChangeset = new Changeset(this.args.user);
  }

  get shouldDisabledButton() {
    return !this.userChangeset.isDirty;
  }

  @action
  onHideModal() {
    this.isShowSharedModal = false;
    this.userChangeset.rollback();
  }

  @action
  async onConfirm() {
    this.isShowSharedModal = false;
    await this.userChangeset.save();
    this.clearFields();
  }

  @action
  onLoginChange(event) {
    this.usernameChange = true;
    this.userChangeset.username = event.target.value;
  }

  @action
  onEmailChange(event) {
    this.emailChange = true;
    this.userChangeset.email = event.target.value;
  }

  @action
  onPasswordChange(event) {
    this.passwordChange = true;
    this.userChangeset.password = event.target.value;
  }

  @action
  onPhotoURLChange(event) {
    this.photoURLChange = true;
    this.userChangeset.photoURL = event.target.value;
  }

  @action
  onAvatarChange(event) {
    event.preventDefault();
    this.avatarChange = false;
    this.userChangeset.avatarURL = event.target.value;
  }

  @action
  async onSave(event) {
    this.isShowSharedModal = true;
    event.preventDefault();
  }

  @action
  rollback() {
    this.userChangeset.rollback();
  }
  clearFields() {
    const fieldIds = ['username', 'email', 'inputPassword', 'photoURL'];
    fieldIds.map((fieldId) => {
      const fieldEl = document.querySelector(`#${fieldId}`);
      fieldEl.value = '';
    });
  }
}
