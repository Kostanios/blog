import { base } from './const';

async function deleteArticle(slug) {
  const articles = fetch(`${base}/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${document.cookie.replace(/Token=[A-z0-9.]*/g, ((str) => str.slice(6)))}`,
    },
  }).then((data) => data.json());
  return articles;
}

export default deleteArticle;
