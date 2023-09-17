import { inject as service } from '@ember/service';
import { Ability } from 'ember-can';

export default class pageAbility extends Ability {
  @service session;

  get canVisit() {
    return Boolean(this.session.currentUser);
  }
}
