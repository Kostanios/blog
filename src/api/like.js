import { base } from './const';

async function like(slug) {
  const likeStatus = fetch(`${base}/articles/${slug}/favorite`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${document.cookie.replace(/Token=[A-z0-9.]*/g, ((str) => str.slice(6)))}`,
    },
  }).then((data) => data.json());
  return likeStatus;
}

export default like;
