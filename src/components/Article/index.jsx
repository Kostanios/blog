import { useState } from 'react';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat/lib/dateformat';
import { useDispatch } from 'react-redux';
import md from 'markdown';

import FavoriteLike from 'assets/SVG/FavoriteLike.svg';
import Like from 'assets/SVG/Like.svg';
import User from 'assets/SVG/User.svg';
import { setViewArticle, likeArticleThunk } from 'redux/slices/dataSlice';
import { ARTICLE } from 'const/path';
import styles from './styles.module.scss';

const { markdown } = md;

const Article = ({ article }) => {
  const [urlValid, setUrlValid] = useState(false);
  const dispatch = useDispatch();
  return <div className={styles.article}>
      <div className={styles.headerContainer}>
        <div className={styles.titleAndTags}>
            <div className={styles.titleLine}>
                <header className={styles.title}>
                <Link onClick={() => {
                  dispatch(setViewArticle(article));
                }} to={`${ARTICLE}/${article.slug}`} >
                    {article.title}
                    </Link>
                </header>
                <div className={styles.likeContainer}>
                    <img
                      onClick={() => { dispatch(likeArticleThunk(article.slug)); }}
                      src={article.favorited ? FavoriteLike : Like} alt=''
                    />
                    <span>{article.favoritesCount >= 0 ? article.favoritesCount : ''}</span>
                </div>
            </div>
            <div className={styles.tags}>
                {article.tagList.map((tagName) => <div key={tagName} className={styles.tag}>{`${tagName}`}</div>)}
            </div>
        </div>
        <div className={styles.authorContainer}>
            <div className={styles.data_name}>
                <div className={styles.name}>{article.author.username}</div>
                <div
                  className={styles.data}
                >
                  {dateFormat(new Date(article.createdAt.slice(0, 10)), 'mmmm dS, yyyy')}
                </div>
            </div>
            <img
              onLoad={() => { setUrlValid(true); }}
              className={styles.avatar}
              src={urlValid ? article.author.image : User}
              alt={''}/>
        </div>
      </div>
      <p className={styles.description}
        dangerouslySetInnerHTML={{ __html: markdown.toHTML(article.description) }}
      ></p>
  </div>;
};
// console.log(article.author.image);
export default Article;
