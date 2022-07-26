import Component from '@glimmer/component';
import { action } from '@ember/object';
import { Changeset } from 'ember-changeset';
import { tracked } from '@glimmer/tracking';
import EditUserValidations from '../../validations/edit-user';
import lookupValidator from 'ember-changeset-validations';

export default class EditUserComponent extends Component {
  @tracked isShowSharedModal = false;

  constructor() {
    super(...arguments);
    this.userChangeset = new Changeset(
      this.args.user,
      lookupValidator(EditUserValidations),
      EditUserValidations
    );
  }

  get shouldDisabledSaveButton() {
    const { userChangeset } = this;
    return !(userChangeset.isDirty && userChangeset.errors.length === 0);
  }

  get shouldDisabledCancelButton() {
    const { userChangeset } = this;
    return !userChangeset.isDirty;
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
  onPropertyChange(key, event) {
    event.preventDefault();
    this.userChangeset[key] = event.target.value || null;
  }

  @action
  async onSave(event) {
    event.preventDefault();
    this.isShowSharedModal = true;
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
