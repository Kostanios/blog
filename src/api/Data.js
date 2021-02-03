import getCookie from 'util/getCookie';
import { base } from './const';

class Data {
  constructor() {
    this.base = base;
    this.articlePerPage = 10;
  }

  async getArticles(page) {
    let articles;
    if (/Token=[A-z0-9.]+/g.test(document.cookie)) {
      articles = fetch(`${this.base}/articles?offset=${(page - 1) * this.articlePerPage}&limit=${this.articlePerPage}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Token ${getCookie('Token').replace(/Token=[A-z0-9.]*/g, ((str) => str.slice(6)))}`,
        },
      }).then((data) => data.json());
    } else {
      articles = fetch(`${this.base}/articles?offset=${page * this.articlePerPage}&limit=${this.articlePerPage}`).then((data) => data.json());
    }
    return articles;
  }

  async createArticle(article) {
    const articleStatus = fetch(`${this.base}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${getCookie('Token').replace(/Token=[A-z0-9.]*/g, ((str) => str.slice(6)))}`,
      },
      body: JSON.stringify({ article }),
    }).then((data) => data.json());
    return articleStatus;
  }

  async updateArticle(parameters) {
    // console.log(parameters.article, '-', parameters.slug);
    const articles = fetch(`${this.base}/articles/${parameters.slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${getCookie('Token').replace(/Token=[A-z0-9.]*/g, ((str) => str.slice(6)))}`,
      },
      body: JSON.stringify({ article: parameters.article }),
    }).then((data) => data.json());
    return articles;
  }

  async deleteArticle(slug) {
    const articles = fetch(`${this.base}/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Token ${getCookie('Token').replace(/Token=[A-z0-9.]*/g, ((str) => str.slice(6)))}`,
      },
    }).then((data) => data.json());
    return articles;
  }

  async likeArticle(slug) {
    const likeStatus = fetch(`${this.base}/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${getCookie('Token').replace(/Token=[A-z0-9.]*/g, ((str) => str.slice(6)))}`,
      },
    }).then((data) => data.json());
    return likeStatus;
  }
}
export default new Data();
