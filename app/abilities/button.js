import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';

export default class PostAbility extends Ability {
  @service session;

  get user() {
    return this.session.currentUser;
  }

  get canPress() {
    return this.user.isAdmin;
  }
}
