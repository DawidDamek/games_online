import Component from '@glimmer/component';
import { action } from '@ember/object';
import { Changeset } from 'ember-changeset';
import { tracked } from '@glimmer/tracking';

export default class EditUserComponent extends Component {
  @tracked isShowSharedModal = false;

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
