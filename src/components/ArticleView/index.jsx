/* eslint-disable react-hooks/rules-of-hooks */
import { useSelector, useDispatch } from 'react-redux';
import dateFormat from 'dateformat/lib/dateformat';
import md from 'markdown';
import { useState } from 'react';

import ArticleInitPage from 'components/ArticleInitPage';
import { deleteArticleThunk, likeArticleThunk } from 'redux/slices/dataSlice';
import Like from 'assets/SVG/Like.svg';
import FavoriteLike from 'assets/SVG/FavoriteLike.svg';
import User from 'assets/SVG/User.svg';
import styles from './styles.module.scss';

const { markdown } = md;

const ArticleView = () => {
  const dispatch = useDispatch();
  const context = useSelector((state) => state);
  const [sure, setSure] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [favorite, setFavorite] = useState(context.data.viewArticle.favorited);
  const [likeCount, setLikeCount] = useState(context.data.viewArticle.favoritesCount);
  const currentUsername = context.auth.currentUser ? context.auth.currentUser.username : '';
  if (!editMode) {
    return <div className={styles.container}>
    <div className={styles.ArticleView}>
      <div className={styles.headerContainer}>
        <div>
            <div className={styles.titleLine}>
                <header className={styles.title}>
                    {context.data.viewArticle.title}
                </header>
                <div className={styles.likeContainer}>
                    <img onClick={() => {
                      if (!favorite) {
                        setFavorite(true);
                        setLikeCount(likeCount + 1);
                      }
                      dispatch(likeArticleThunk(context.data.viewArticle.slug));
                    }} src={ favorite ? FavoriteLike : Like} alt=''/>
                    <span>{context.data.viewArticle.favoritesCount >= 0 ? likeCount : ''}</span>
                </div>
            </div>
            <div className={styles.tags}>
              {context.data.viewArticle.tagList.map((tagName) => <div key={tagName} className={styles.tag}>{`${tagName}`}</div>)}
            </div>
        </div>
        <div className={styles.authorContainer}>
            <div className={styles.data_name}>
                <div className={styles.name}>{context.data.viewArticle.author.username}</div>
                <div
                  className={styles.data}
                >
                  {dateFormat(new Date(context.data.viewArticle.createdAt.slice(0, 10)), 'mmmm dS, yyyy')}
                </div>
            </div>
            <img
              className={styles.avatar}
              src={context.data.viewArticle.author.image
                ? context.data.viewArticle.author.image
                : User}
              alt={''}/>
        </div>
      </div>
      <div className={styles.descriptionAndButtons}>
        <p className={styles.description}
        dangerouslySetInnerHTML={{ __html: markdown.toHTML(context.data.viewArticle.description) }}
        ></p>
        {context.data.viewArticle.author.username !== currentUsername
          ? null
          : <div className={styles.buttons}>
              <button
              onClick={() => { setSure(true); }}
                className={styles.deleteButton}>Delete</button>
              <div className={styles.sureContainer}>
                <div className={sure ? styles.sure : styles.hideSure}>
                  <span>Are you sure to delete this article?</span>
                  <div className={styles.sureButtons}>
                    <button
                      className={styles.sureButton}
                      onClick={() => { setSure(false); }}
                    >
                      No
                    </button>
                    <button
                      onClick={() => {
                        dispatch(deleteArticleThunk(context.data.viewArticle.slug));
                      }}
                      className={styles.sureButton}
                    >
                      Yes
                    </button>
                  </div>
                </div>
              </div>
              <button
                className={styles.editButton}
                onClick={() => { setEditMode(true); }}>Edit</button>
            </div>}
      </div>
      <p className={styles.body}
        dangerouslySetInnerHTML={{ __html: markdown.toHTML(context.data.viewArticle.body) }}
      ></p>
  </div>
  </div>;
  }
  return <ArticleInitPage slug={context.data.viewArticle.slug} />;
};
export default ArticleView;
