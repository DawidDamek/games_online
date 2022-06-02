import Component from '@glimmer/component';
import { action } from '@ember/object';
import { Changeset } from 'ember-changeset';

export default class EditUserComponent extends Component {
  constructor() {
    super(...arguments);
    this.userChangeset = new Changeset(this.args.user);
  }

  get shouldDisabledButton() {
    return !this.userChangeset.isDirty;
  }

  @action
  onLoginChange(event) {
    this.userChangeset.username = event.target.value;
  }

  @action
  onEmailChange(event) {
    this.userChangeset.email = event.target.value;
  }

  @action
  onPasswordChange(event) {
    this.userChangeset.password = event.target.value;
  }

  @action
  onPhotoURLChange(event) {
    this.userChangeset.photoURL = event.target.value;
  }

  @action
  onAvatarChange(event) {
    event.preventDefault();
    this.userChangeset.avatarURL = event.target.value;
  }

  @action
  async onSave(event) {
    event.preventDefault();

    await this.userChangeset.save();
    alert('all changes are saved');
    this.clearFields();
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
