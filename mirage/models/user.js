import { Model, hasMany } from 'miragejs';

export default Model.extend({
  gameHistory: hasMany('game-history'),
});
