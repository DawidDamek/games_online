import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class UserSettingsController extends Controller {
  @service store;
  @service session;

  @action
  onLoginChange(event) {
    this.model.username = event.target.value;
  }

  @action
  onEmailChange(event) {
    this.model.email = event.target.value;
  }

  @action
  onPasswordChange(event) {
    this.model.password = event.target.value;
  }

  @action
  onPhotoURLChange(event) {
    this.model.photoURL = event.target.value;
  }

  @action
  onAvatarChange(event) {
    event.preventDefault();
    this.model.avatarURL = event.target.value;
  }

  @action
  async onSave(event) {
    event.preventDefault();

    await this.model.save();
    alert('all changes are saved');
  }
}
