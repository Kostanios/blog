import { base } from './const';

async function getUser() {
  // console.log(`${document.cookie}`);
  const user = fetch(`${base}/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${document.cookie.replace(/Token=[A-z0-9.]*/g, ((str) => str.slice(6)))}`,
    },
  }).then((data) => data.json());
  return user;
}

export default getUser;
