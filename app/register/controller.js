import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { Changeset } from 'ember-changeset';
import lookupValidator from 'ember-changeset-validations';
import EditUserValidations from '../validations/edit-user';

export default class RegisterController extends Controller {
  @service store;
  @service router;

  user = this.store.createRecord('user');
  constructor() {
    super(...arguments);
    this.registerChangeset = new Changeset(
      this.user,
      lookupValidator(EditUserValidations),
      EditUserValidations
    );
  }

  get shouldBeAbleToRegister() {
    const { changes, errors } = this.registerChangeset;
    return !(changes.length == 5 && errors.length == 0);
  }

  @action
  onPropertyChange(key, event) {
    event.preventDefault();
    this.registerChangeset[key] = event.target.value || null;
  }

  @action
  async onSubmit(event) {
    event.preventDefault();
    await this.registerChangeset.save();
    this.router.transitionTo('login');
  }
}
