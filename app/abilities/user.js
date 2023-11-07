import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';

export default class pageAbility extends Ability {
  @service session;

  get canSeeSecrets() {
    // const { id, isAdmin } = this.session.currentUser;
    // const userID = this.model;
    // return Boolean(id === userID || isAdmin);
    return true;
  }
}
