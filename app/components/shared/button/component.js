import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class SharedButtonComponent extends Component {
  get type() {
    return this.args.type || 'button';
  }

  @action
  onClick() {
    this.args?.onClick?.();
  }
}
