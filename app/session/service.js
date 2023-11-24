import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { storageFor } from 'ember-local-storage';
import { tracked } from '@glimmer/tracking';

export default class SessionService extends Service {
  @storageFor('logged-as') loggedAs;
  @service store;
  @tracked currentUser;

  get isLoggedIn() {
    return this.loggedAs.get('id');
  }

  async loginUser(id) {
    this.loggedAs.set('id', id);
    await this.setCurrentUser();
  }

  logoutUser() {
    this.loggedAs.set('id', null);
    window.location.href = '/login';
  }

  async loginOrRegisterBy0auth({
    nickname: username,
    email,
    picture: photoURL,
  }) {
    const password = '';
    const users = await this.store.query('user', {
      filter: { email },
    });
    let user = users.firstObject;
    if (!user) {
      user = await this.store
        .createRecord('user', {
          username,
          password,
          email,
          photoURL,
        })
        .save();
    }

    this.loggedAs.set('id', user.id);
    window.location.href = '/';
  }

  async fetchSomething() {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos/1'
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  async putRecord(id, updatedData) {
    try {
      const data = await this.fetchSomething;

      const updatedRecord = { ...data, ...updatedData };

      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedRecord),
        }
      );

      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error('Error updating record:', error);
      throw error;
    }
  }

  async patchRecord(id, updatedData) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        }
      );

      const responseData = await response.json();

      return responseData;
    } catch (error) {
      console.error('Error updating record:', error);
      throw error;
    }
  }

  async setCurrentUser() {
    const userId = this.loggedAs.get('id');
    const user = await this.store.findRecord('user', userId);
    this.currentUser = user;
  }
}
