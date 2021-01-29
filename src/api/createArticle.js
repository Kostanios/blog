import { base } from './const';

async function createArticle(article) {
  const articleStatus = fetch(`${base}/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${document.cookie.replace(/Token=[A-z0-9.]*/g, ((str) => str.slice(6)))}`,
    },
    body: JSON.stringify({ article }),
  }).then((data) => data.json());
  return articleStatus;
}

export default createArticle;
