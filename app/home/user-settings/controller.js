import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default class UserSettingsController extends Controller {
  @service store;
  @service session;
}
