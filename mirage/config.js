export default function () {
  this.passthrough('https://dev-4pbsyp02.us.auth0.com/userinfo');
  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  this.get('/users');
  this.get('/users/:id');
  this.post('/users');
  this.put('/users/:id');

  this.get('/gameHistories');
  this.get('/gameHistories/:id');
  this.post('/gameHistories');
  this.put('/gameHistories/:id');
}
