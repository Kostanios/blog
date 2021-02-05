import getCookie from 'util/getCookie';

function getToken() {
  return `Token ${getCookie('Token').replace(/Token=[A-z0-9.]*/g, ((str) => str.slice(6)))}`;
}

export default getToken;
