import { base } from './const';

const articlePerPage = 10;

async function getArticles(page) {
  let articles;
  if (/Token=[A-z0-9.]+/g.test(document.cookie)) {
    articles = fetch(`${base}/articles?offset=${page * articlePerPage}&limit=${articlePerPage}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${document.cookie.replace(/Token=[A-z0-9.]*/g, ((str) => str.slice(6)))}`,
      },
    }).then((data) => data.json());
  } else {
    articles = fetch(`${base}/articles?offset=${page * articlePerPage}&limit=${articlePerPage}`).then((data) => data.json());
  }
  return articles;
}

export default getArticles;
