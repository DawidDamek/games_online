import Model, { attr, hasMany } from '@ember-data/model';

export default class UserModel extends Model {
  @attr('string') username;
  @attr('string') password;
  @attr('string') email;
  @attr('string') photoURL;
  @attr('string') avatarURL;
  @attr('number', { defaultValue: 0 }) whacamoleTopScore;
  @attr('number', { defaultValue: 0 }) memoryTopScore;
  @attr('boolean', { defaultValue: false }) isDeleted;
  @attr('boolean', { defaultValue: false }) isAdmin;
  @hasMany('gameHistory') gameHistory;
}
