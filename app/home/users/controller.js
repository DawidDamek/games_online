import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class UsersController extends Controller {
  @tracked sortMemory = null;
  @tracked sortWhacamole = null;

  queryParams = ['sortMemory', 'sortWhacamole'];
}
