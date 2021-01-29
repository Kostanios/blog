import { base } from './const';

async function login(user) {
  const userStatus = fetch(`${base}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ user }),
  }).then((data) => data.json());
  return userStatus;
}

export default login;
