import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { Changeset } from 'ember-changeset';

export default class UserSettingsController extends Controller {
  @service store;
  @service session;
}
