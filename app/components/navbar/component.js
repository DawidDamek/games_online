import Component from '@glimmer/component';
import { action } from '@ember/object';
import { storageFor } from 'ember-local-storage';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class NavbarComponent extends Component {
  @storageFor('logged-as') loggedAs;
  @service store;
  @tracked loggedUser;

  // //sposób  2
  // model() {
  //   const loggedUser = this.store.findRecord('user', loggedAs.id);
  //   console.log(loggedUser.username, 'dupa');
  //   return loggedUser;
  // }
  //sposób  2
  constructor() {
    super(...arguments);

    this.loggedUser = this.store.findRecord('user', this.loggedAs.get('id'));
  }

  @action
  onLogout() {
    this.loggedAs.set('id', null);
    window.location.href = '/login';
  }
}
