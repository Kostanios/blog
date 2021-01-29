import { base } from './const';

async function createArticle(parameters) {
  console.log(parameters.article, '-', parameters.slug);
  const articles = fetch(`${base}/articles/${parameters.slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${document.cookie.replace(/Token=[A-z0-9.]*/g, ((str) => str.slice(6)))}`,
    },
    body: JSON.stringify({ article: parameters.article }),
  }).then((data) => data.json());
  return articles;
}

export default createArticle;
