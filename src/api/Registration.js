import { base } from './const';

async function registration(user) {
  const userStatus = fetch(`${base}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ user }),
  }).then((data) => data.json());
  return userStatus;
}

export default registration;
