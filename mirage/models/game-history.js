import { Model, belongsTo } from 'miragejs';

export default Model.extend({
  player: belongsTo('user'),
});
