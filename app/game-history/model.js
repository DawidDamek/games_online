import Model, { attr, belongsTo } from '@ember-data/model';

export default class GameHistoryModel extends Model {
  @attr('string') gameName;
  @attr('string') date;
  @attr('number') points;
  @belongsTo('user') player;
}
