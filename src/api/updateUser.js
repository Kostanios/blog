import { base } from './const';

async function updateUser(newUser) {
  const userStatus = fetch(`${base}/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${document.cookie.replace(/Token=[A-z0-9.]*/g, ((str) => str.slice(6)))}`,
    },
    body: JSON.stringify({ user: newUser }),
  }).then((data) => data.json());
  return userStatus;
}

export default updateUser;
