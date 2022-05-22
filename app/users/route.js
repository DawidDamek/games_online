import Route from '@ember/routing/route';

export default class UsersRoute extends Route {
  model() {
    const users = [
      {
        id: 1,
        username: 'admin',
        password: 'admin123',
        email: 'admin@admin.com',
        isDeleted: false,
        isAdmin: true,
        memoryTopScore: 0,
        whacamoleTopScore: 0,
      },
      {
        id: 2,
        username: 'user',
        password: 'user123',
        email: 'user@user.com',
        isDeleted: false,
        isAdmin: false,
        memoryTopScore: 0,
        whacamoleTopScore: 0,
      },
    ];
    return users;
  }
}
