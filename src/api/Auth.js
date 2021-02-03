import getCookie from 'util/getCookie';
import { base } from './const';

class Auth {
  constructor() {
    this.base = base;
  }

  async registration(user) {
    const userStatus = fetch(`${this.base}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ user }),
    }).then((data) => data.json());
    return userStatus;
  }

  async login(user) {
    const userStatus = fetch(`${this.base}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ user }),
    }).then((data) => data.json());
    return userStatus;
  }

  async getUser() {
    // console.log(`${document.cookie}`);
    const user = fetch(`${this.base}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${getCookie('Token').replace(/Token=[A-z0-9.]*/g, ((str) => str.slice(6)))}`,
      },
    }).then((data) => data.json());
    return user;
  }

  async updateUser(newUser) {
    const userStatus = fetch(`${this.base}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${getCookie('Token').replace(/Token=[A-z0-9.]*/g, ((str) => str.slice(6)))}`,
      },
      body: JSON.stringify({ user: newUser }),
    }).then((data) => data.json());
    return userStatus;
  }
}
export default new Auth();
