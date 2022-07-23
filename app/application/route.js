import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ENV from 'games-online/config/environment';

const isTesting = ENV.environment === 'test';

export default class ApplicationRoute extends Route {
  @service store;

  async beforeModel() {
    const isFilledDataBase = window.localStorage.length;
    if (isTesting || !isFilledDataBase) {
      return;
    }
    const user1 = {
      id: 1,
      username: 'admin',
      password: 'admin123',
      email: 'admin@admin.com',
      avatarURL: '/assets/images/icons/pig.png',
      photoURL:
        'https://naukawpolsce.pl/sites/default/files/styles/strona_glowna_slider_750x420/public/202005/portretProboscis_monkey_%28Nasalis_larvatus%29_male_head_0.jpg?itok=4nPIZ3jj',
      isAdmin: true,
      whacamoleTopScore: 12,
      memoryTopScore: 70,
    };
    const user2 = {
      id: 2,
      username: 'user',
      password: 'user123',
      email: 'user@user.com',
      avatarURL: '/assets/images/icons/lion.png',
      photoURL:
        'https://img.smyk.com/https://beta-cdn.smyk.com/media/product/760/1/spongebob-recznik-30-50-cm-6752424.jpg',
      whacamoleTopScore: 30,
      memoryTopScore: 50,
    };

    const user1Model = this.store.createRecord('user', user1);
    const user2Model = this.store.createRecord('user', user2);
    await user1Model.save();
    await user2Model.save();

    const gamehistory1 = {
      gameName: 'Whac a Mole',
      date: new Date(2022, 6, 13),
      points: 12,
      player: user1Model,
    };
    const gamehistory2 = {
      gameName: 'Whac a Mole',
      date: new Date(2022, 3, 24),
      points: 30,
      player: user2Model,
    };
    const gamehistory3 = {
      gameName: 'Memory',
      date: new Date(2022, 6, 12),
      points: 70,
      player: user1Model,
    };
    const gamehistory4 = {
      gameName: 'Memory',
      date: new Date(2022, 6, 12),
      points: 50,
      player: user2Model,
    };

    const gameHistory1Model = this.store.createRecord(
      'gameHistory',
      gamehistory1
    );
    const gameHistory2Model = this.store.createRecord(
      'gameHistory',
      gamehistory2
    );
    const gameHistory3Model = this.store.createRecord(
      'gameHistory',
      gamehistory3
    );
    const gameHistory4Model = this.store.createRecord(
      'gameHistory',
      gamehistory4
    );
    await gameHistory1Model.save();
    await gameHistory2Model.save();
    await gameHistory3Model.save();
    await gameHistory4Model.save();
  }
}
