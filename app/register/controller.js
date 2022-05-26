import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { storageFor } from 'ember-local-storage';

export default class RegisterController extends Controller {
  @storageFor('logged-as') loggedAs;
  @service store;
  @service router;

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
    console.log(event.target.value);
    this.model.avatarURL = event.target.value;
  }

  @action
  async onSubmit(event) {
    event.preventDefault();
    await this.model.save();
    const user = this.model.id;
    this.router.transitionTo('login');
  }
}